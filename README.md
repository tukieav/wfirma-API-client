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

    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

2. Upewnij się, że baza danych MongoDB jest uruchomiona i dostępna z podanymi danymi konfiguracyjnymi.

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
- **Autoryzacja**: Aplikacja używa JWT do autoryzacji. Upewnij się, że zmienna `JWT_SECRET` jest ustawiona w pliku `.env`.
- **Połączenie z MongoDB**: Aplikacja używa MongoDB do przechowywania danych. Upewnij się, że zmienna `MONGODB_URI` jest ustawiona w pliku `.env`.
