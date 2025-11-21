# Heva – Herbalife Wellness & Distributor Platform

> **Heva** è la WebApp PWA **mobile-first** per clienti Herbalife e distributori, con AI integrata per piani nutrizionali / allenamento, gestione downline e operatività quotidiana.

---

## Obiettivi del progetto

- **MVP 0–90 giorni** pronto per essere usato da:
  - **Clienti**: percorso guidato, piani personalizzati, check-in e body analysis.
  - **Distributori**: CRM semplificato, work log, gestione downline, supporto AI.
- Base tecnica solida per l’espansione **90–180 giorni** (dashboard pro, eventi live, billing, ecc.).
- Integrazione profonda con AI via **JSON contracts** e job queue dedicata.

---

## Moduli principali

- **Percorso (Journey)**
  - Moduli: Nutrition Setup, Training Setup, Body Analysis, Quick Check, Profile Update.
  - Generazione e aggiornamento dei piani (nutrition + training).

- **Operatività**
  - Work Log distributori.
  - Task giornalieri e follow-up.
  - Supporto AI per prossime azioni consigliate.

- **Assistant**
  - Chat multi-thread (cliente / distributore).
  - Quick actions collegate ai moduli e ai piani.
  - Collegamento con knowledge base Herbalife.

- **Organization**
  - Albero downline multilivello (distributori → clienti).
  - Inviti, ruoli, visibilità dati, pannello admin.

---

## Architettura ad alto livello

4 layer principali:

1. **App Client (Next.js PWA – Heva)**
   - UI mobile-first (tab: Dashboard, Piano, Moduli, Chat, Profilo).
   - Stato locale + sincronizzazione con backend.

2. **API Backend**
   - Supabase Edge Functions + eventuale Node/Koa per casi speciali.
   - Autenticazione, RLS, validazione input, orchestrazione job AI.

3. **AI Layer**
   - **AI Bridge** (unico entrypoint verso i modelli).
   - **AI Workers** (job queue, orchestrazione, retry).
   - JSON contracts versionati in `/contracts`.

4. **Data Layer**
   - Supabase Postgres + pgvector.
   - Tabelle chiave: `users`, `profiles`, `module_submissions`, `ai_jobs`, `plans`, `work_logs`,
     `chat_threads`, `ai_memory`, ecc.

Schema logico (semplificato):

```text
[ Heva PWA ]  →  [ API Backend ]  →  [ Job Queue ]  →  [ AI Workers + AI Bridge ]
     ↓                    ↘                ↘                 ↓
 Supabase Auth         Supabase DB      Logs / Metrics    pgvector / KB
