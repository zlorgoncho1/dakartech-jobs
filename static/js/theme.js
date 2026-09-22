/* ==========================================================================
   DAKARTECH JOBS — theme.js
   Petites interactions en JavaScript pur, sans dépendance.

   Chaque bloc est indépendant : il cherche ses éléments via des attributs
   `data-*` et ne fait rien si la page n'en contient pas. On peut donc
   inclure ce fichier une seule fois dans base.html.

   Sommaire
   --------
   1. Menu mobile           [data-toggle="nav"]
   2. Panneau de filtres    [data-toggle="filters"]
   3. Menus déroulants      [data-dropdown] / [data-dropdown-toggle]
   4. Alertes fermables     [data-dismiss="alert"]
   5. Onglets               [data-tabs] / [data-tab] / [data-tab-panel]
   6. Chips à bascule       button.chip[aria-pressed]
   7. Champ fichier         .form-file
   8. Curseur avec valeur   [data-range-output]
   9. Validation légère     form[data-validate]
   10. Soumission auto      select[data-autosubmit]
   ========================================================================== */
(function () {
  'use strict';

  /* Utilitaire : sélectionne tous les éléments correspondants (tableau). */
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* ------------------------------------------------------------------
     1. Menu mobile (burger)
     <button data-toggle="nav" aria-controls="site-nav" aria-expanded="false">
     ------------------------------------------------------------------ */
  $$('[data-toggle="nav"]').forEach((button) => {
    const nav = document.getElementById(button.getAttribute('aria-controls'));
    if (!nav) return;
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      button.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });

  /* ------------------------------------------------------------------
     2. Panneau de filtres (masqué par défaut sur mobile)
     <button data-toggle="filters" aria-controls="filters-panel">
     ------------------------------------------------------------------ */
  $$('[data-toggle="filters"]').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    button.addEventListener('click', () => {
      const open = panel.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  /* ------------------------------------------------------------------
     3. Menus déroulants (menu utilisateur, actions…)
     <div class="dropdown" data-dropdown>
       <button data-dropdown-toggle aria-expanded="false">…</button>
       <div class="dropdown__menu">…</div>
     </div>
     ------------------------------------------------------------------ */
  const dropdowns = $$('[data-dropdown]');
  const closeDropdowns = (except) => {
    dropdowns.forEach((dd) => {
      if (dd === except) return;
      dd.classList.remove('is-open');
      const t = dd.querySelector('[data-dropdown-toggle]');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  };
  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector('[data-dropdown-toggle]');
    if (!toggle) return;
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = dd.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open) closeDropdowns(dd);
    });
  });
  if (dropdowns.length) {
    document.addEventListener('click', () => closeDropdowns());
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDropdowns();
    });
  }

  /* ------------------------------------------------------------------
     4. Alertes fermables (messages Django)
     <div class="alert"> … <button data-dismiss="alert">×</button></div>
     ------------------------------------------------------------------ */
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-dismiss="alert"]');
    if (!button) return;
    const alert = button.closest('.alert');
    if (!alert) return;
    /* Si l'alerte est dans une liste .messages, on retire aussi le <li> parent. */
    const item = alert.parentElement && alert.parentElement.tagName === 'LI' ? alert.parentElement : alert;
    item.remove();
  });

  /* ------------------------------------------------------------------
     5. Onglets
     <div class="tabs" data-tabs role="tablist">
       <button class="tabs__tab" role="tab" data-tab="a" aria-selected="true">A</button>
     </div>
     <div data-tab-panel="a">…</div>  <div data-tab-panel="b" hidden>…</div>
     ------------------------------------------------------------------ */
  $$('[data-tabs]').forEach((tablist) => {
    const tabs = $$('[data-tab]', tablist);
    const activate = (tab) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.classList.toggle('is-active', selected);
        const panel = document.querySelector('[data-tab-panel="' + t.dataset.tab + '"]');
        if (panel) panel.hidden = !selected;
      });
    };
    tabs.forEach((tab) => tab.addEventListener('click', () => activate(tab)));
  });

  /* ------------------------------------------------------------------
     6. Chips à bascule (filtres rapides sans rechargement)
     <button class="chip" aria-pressed="false">Télétravail</button>
     ------------------------------------------------------------------ */
  $$('button.chip[aria-pressed]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const pressed = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', String(!pressed));
    });
  });

  /* ------------------------------------------------------------------
     7. Champ fichier : afficher le nom du fichier choisi
     <label class="form-file"><input type="file"> … <span class="form-file__name">Aucun fichier</span></label>
     ------------------------------------------------------------------ */
  $$('.form-file input[type="file"]').forEach((input) => {
    const label = input.closest('.form-file');
    const output = label && label.querySelector('.form-file__name');
    if (!output) return;
    const defaultText = output.textContent;
    input.addEventListener('change', () => {
      output.textContent = input.files && input.files.length ? input.files[0].name : defaultText;
    });
  });

  /* ------------------------------------------------------------------
     8. Curseur (range) avec affichage de la valeur
     <input type="range" data-range-output="salaire-min-out">
     <output id="salaire-min-out"></output>
     ------------------------------------------------------------------ */
  const formatFCFA = (value) => Number(value).toLocaleString('fr-FR') + ' FCFA';
  $$('[data-range-output]').forEach((range) => {
    const output = document.getElementById(range.dataset.rangeOutput);
    if (!output) return;
    const update = () => { output.textContent = formatFCFA(range.value); };
    range.addEventListener('input', update);
    update();
  });

  /* ------------------------------------------------------------------
     9. Validation légère côté client
     <form data-validate novalidate> … <input required> …
     Au submit : les champs invalides reçoivent .is-invalid et un message
     .form-error est ajouté sous le champ (texte de data-error ou message natif).
     La vraie validation reste côté Django (forms.py) — ceci n'est qu'un confort.
     ------------------------------------------------------------------ */
  $$('form[data-validate]').forEach((form) => {
    form.setAttribute('novalidate', '');

    const showError = (field, message) => {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      const group = field.closest('.form-group') || field.parentElement;
      if (!group || group.querySelector('.form-error[data-generated]')) return;
      const error = document.createElement('p');
      error.className = 'form-error';
      error.setAttribute('data-generated', '');
      error.textContent = message;
      group.appendChild(error);
    };

    const clearError = (field) => {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      const group = field.closest('.form-group') || field.parentElement;
      const error = group && group.querySelector('.form-error[data-generated]');
      if (error) error.remove();
    };

    form.addEventListener('submit', (event) => {
      let firstInvalid = null;
      $$('input, select, textarea', form).forEach((field) => {
        clearError(field);
        if (field.checkValidity()) return;
        showError(field, field.dataset.error || field.validationMessage);
        if (!firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        event.preventDefault();
        firstInvalid.focus();
      }
    });

    /* Efface l'erreur dès que l'utilisateur corrige le champ. */
    form.addEventListener('input', (event) => {
      const field = event.target;
      if (field.classList.contains('is-invalid') && field.checkValidity()) clearError(field);
    });
  });

  /* ------------------------------------------------------------------
     10. Soumission automatique (tri d'une liste, par exemple)
     <form method="get"><select name="tri" data-autosubmit>…</select></form>
     ------------------------------------------------------------------ */
  $$('select[data-autosubmit]').forEach((select) => {
    select.addEventListener('change', () => {
      if (select.form) select.form.submit();
    });
  });
})();
