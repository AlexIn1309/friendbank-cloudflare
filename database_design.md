# DISENYO DE LA BASE DE DATOS DE FRIENDBANK

## TABLA DE ROLES

CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

- Guarda los roles disponibles dentro de la plataforma y su nombre para la autorizacion de los usuarios
- QUERY
CREATE TABLE roles (id INTEGER PRIMARY KEY,name TEXT NOT NULL UNIQUE);
- Archivo: migrations/0001_init.sql

## TABLA DE USUARIOS 

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role_id INTEGER NOT NULL DEFAULT 2,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(role_id) REFERENCES roles(id)
);

- Administra los usuarios en la plataforma
- QUERY
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,role_id INTEGER NOT NULL DEFAULT 2,created_at DATETIME DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(role_id) REFERENCES roles(id));
- Archivo: migrations/0001_init.sql

## TABLA DE CUENTAS

CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    balance_cents INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY(user_id) REFERENCES users(id)
);

- Cada cuenta lleva el registro de la cantidad de friendcoins que tiene cada usuario
- QUERY
CREATE TABLE accounts (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL UNIQUE,balance_cents INTEGER NOT NULL DEFAULT 0,FOREIGN KEY(user_id) REFERENCES users(id));
- Archivo: migrations/0001_init.sql

## TABLA DE SESIONES

CREATE TABLE user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    refresh_token_uuid TEXT NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    revoked INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY(user_id) REFERENCES users(id)
);

- Funge como registro para las sesiones de los usuarios
- QUERY
CREATE TABLE user_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,refresh_token_uuid TEXT NOT NULL UNIQUE,expires_at DATETIME NOT NULL,created_at DATETIME DEFAULT CURRENT_TIMESTAMP,revoked INTEGER NOT NULL DEFAULT 0,FOREIGN KEY(user_id) REFERENCES users(id));

## TABLA DE TRANSACCIONES

CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    amount_cents INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(sender_id) REFERENCES users(id),
    FOREIGN KEY(recipient_id) REFERENCES users(id)
);

- Se busca que se haga registro de todas y cada una de las transacciones sucedidas durante la vida y uso del software
- QUERY
CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT,sender_id INTEGER NOT NULL,recipient_id INTEGER NOT NULL,amount_cents INTEGER NOT NULL,created_at DATETIME DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(sender_id) REFERENCES users(id),FOREIGN KEY(recipient_id) REFERENCES users(id));
- Archivo: migrations/0001_init.sql

## TABLA DE AUDITORIA

CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    accountant_user_id INTEGER NOT NULL,
    target_user_id INTEGER NOT NULL,

    amount_cents INTEGER NOT NULL,
    operation_type TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(accountant_user_id) REFERENCES users(id),
    FOREIGN KEY(target_user_id) REFERENCES users(id)
);

- Su objetivo es permitir la revision y analisis en caso de necesitar
- QUERY
CREATE TABLE audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT,accountant_user_id INTEGER NOT NULL,target_user_id INTEGER NOT NULL,amount_cents INTEGER NOT NULL,operation_type TEXT NOT NULL,created_at DATETIME DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(accountant_user_id) REFERENCES users(id),FOREIGN KEY(target_user_id) REFERENCES users(id));

