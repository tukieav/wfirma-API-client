## Opis

Mikroserwis do integracji z API wFirma i obsługi webhooków.

## Instalacja

1. Sklonuj repozytorium:
    ```sh
    git clone <URL_REPOZYTORIUM>
    cd <NAZWA_REPOZYTORIUM>
    ```

2. Zainstaluj zależności:
    ```sh
    npm install
    ```

## Konfiguracja

1. Utwórz plik `.env` w katalogu głównym projektu z następującymi zmiennymi:
    ```plaintext
    PORT=3000

    WFIRMA_APP_KEY=your_wfirma_app_key
    WFIRMA_ACCESS_KEY=your_wfirma_access_key
    WFIRMA_SECRET_KEY=your_wfirma_secret_key
    WFIRMA_API_URL=https://api2.wfirma.pl

    COMPANY_ID=your_company_id
    WEBHOOK_KEY=your_webhook_key

    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    DB_DATABASE=your_db_name
    ```

2. Upewnij się, że baza danych jest uruchomiona i dostępna z podanymi danymi konfiguracyjnymi.

## Konfiguracja bazy danych

1. Zainstaluj PostgreSQL, jeśli jeszcze nie jest zainstalowany:
    - Na Ubuntu:
        ```sh
        sudo apt update
        sudo apt install postgresql postgresql-contrib
        ```
    - Na macOS:
        ```sh
        brew install postgresql
        ```

2. Uruchom serwer PostgreSQL:
    ```sh
    sudo service postgresql start
    ```

3. Utwórz użytkownika bazy danych:
    ```sh
    sudo -u postgres createuser --interactive
    ```
    - Podaj nazwę użytkownika (np. `wfapp`).
    - Wybierz opcję `y` dla superużytkownika.

4. Utwórz bazę danych:
    ```sh
    sudo -u postgres createdb mydatabase
    ```

5. Ustaw hasło dla użytkownika bazy danych:
    ```sql
    sudo -u postgres psql
    ALTER USER wfapp WITH PASSWORD '123123qwe';
    \q
    ```

6. Zaktualizuj plik `.env` z odpowiednimi danymi do połączenia z bazą danych.

## Tworzenie tabel w bazie danych

1. Połącz się z bazą danych:
    ```sh
    sudo -u postgres psql mydatabase
    ```

2. Utwórz tabele:
    ```sql
    CREATE TABLE Invoices (
        invoice_id SERIAL PRIMARY KEY,
        contractor_id INTEGER,
        fullnumber VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE InvoiceContents (
        invoicecontent_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        count INTEGER,
        unit VARCHAR(50),
        price NUMERIC,
        netto NUMERIC,
        brutto NUMERIC,
        invoice_id INTEGER REFERENCES Invoices(invoice_id)
    );

    CREATE TABLE VatContents (
        vat_content_id SERIAL PRIMARY KEY,
        netto NUMERIC,
        tax NUMERIC,
        brutto NUMERIC,
        invoice_id INTEGER REFERENCES Invoices(invoice_id)
    );
    ```

3. Wyjdź z psql:
    ```sql
    \q
    ```

## Uruchomienie

1. Uruchom serwer:
    ```sh
    npm start
    ```

2. Serwer powinien być dostępny pod adresem `http://localhost:3000` (lub innym, jeśli zmieniono port w pliku `.env`).

## Testy

1. Uruchom testy jednostkowe i integracyjne:
    ```sh
    npm test
    ```

## Dodatkowe informacje

- **Logi**: Logi aplikacji są zapisywane w plikach `error.log` i `combined.log` w katalogu głównym projektu.
- **Obsługa błędów**: W przypadku problemów z połączeniem z API wFirma lub bazą danych, sprawdź konfigurację w pliku `.env` oraz logi aplikacji.
- **Webhooki**: Aplikacja obsługuje webhooki z wFirma. Upewnij się, że klucz webhooka (`WEBHOOK_KEY`) jest poprawnie skonfigurowany.