<!-- gallery -> details -> rent / sell /

# auth (accessuble by user)

# bff (accessuble by user)

# bikes (servers)

# client (FE)

## components

### header.jsx

### footer.jsx

# infra

# logger -->

```
TryggSone
├── auth/ (accessuble by user) uses authClient
├── bff/ (accessuble by user) connected to all other services (bikes, scooters, etc) -> user req comes here
├── bikes/ (servers)
├── client/ (FE)
│   ├── app/
│   │   └── locale/
│   │       ├── auth/
│   │       └── bikes/
│   └── components/
│       ├── Header.jsx
│       └── Footer.jsx
├── infra/
├── loggwer/
├── .gitignore
├── features-plan.md
└── skaffold.yaml
```
