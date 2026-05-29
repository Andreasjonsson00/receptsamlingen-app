### Uppgiftsöversikt
#### https://github.com/Bellika/FSU25D/blob/main/GRUPPUPPGIFT.md

### Trello
#### https://trello.com/b/FZC8jFJX/fe-grupparbete

### Scrum/Kommunikation
#### 11.00 Dagligen + Discord

## Projektbeskrivning
### Receptsamling
#### 'Receptsamling' är precis som det låter- en sida med samlade recept för matlagnings-inspiration och receptorganisering. 
#### Appen innehåller följande sidor:
#### 1.Startsida ("/"): På startsidan blir du snabbt välkomnad till appen och blir visad ett mindre urval av recept. Sök & filter-funktionerna på denna sida har tillgång till SAMTLIGA recept i appen, inte endast de urvalda: man kan alltså snabbt söka och hitta recept härifrån, utan att behöva gå in på recept-sidan. Observera dock att filtrering endast ger avkast på max 6 recept här. 
#### 2.Receptsida (/recipes): Här hittar du samtliga recept som finns i appen, med tillhörande sök- & filterfunktion. 
#### 3.Detaljsida ("/recipes/:id"): Visar mer detaljerad data såsom ingredienser och instruktioner för ett recept. Här kommer du även åt Edit-funktionen per recept, eller välja att permanent ta bort receptet från databasen.
#### 4.Editsida ("/recipes/:id/edit"): Hit kommer du om du klickar på "Edit"-knappen i ett recepts detaljsida. Här kan du modifiera ALL data i ett recept.
#### 5.Favoritsida ("/favorites"): Samlingssida för favoriserade recept för enkel tillgång till Admins personliga favoriter. Notera att du endast har tillgång till denna sida (iallafall DIN lista) om du klickat på "Login".
#### 6.Add-recipe-sida ("/create"): Här har du chansen att överhetta servern och proppa den med nya recept. Likt Edit-sidan får du här ange samtlig data för ett recept samt ladda upp en bild på den favoritpotatis. 

### CSS
#### Vi använder CSS grid. Vi jobbar så mycket med “global” css (generell css i index.css-filen) som möjligt för att bibehålla kontexten i temat: Hemtrevligt.

### Components
#### -Header: Innehåller logga(länkbild till "/") samt MockLoginButton.
#### -Footer: Endast signaturtext.
#### -Navbar: Innehåller routes för Hem, Lägg till recept samt Favoriter (om inloggad)
#### -LanguageSwitcher: Ändrar appens språk SV/ENG
#### -SearchBar: Söker och hämtar matchningar från samtliga objekt genom namn/ingrediens.
#### -FilterBar: Filtrerar samtliga objekt efter kategori (t,ex "desser", "vegan" etc.)
#### -RecipeForm: Återanvändbart AddRecipeForm/EditRecipeForm
#### -ToggleFavouriteButton: Bool-styrd filtrering > filtreras på FavouritesPage
#### -Recipe: Själva recept-objektet
#### -MockLoginButton: Enkel simulering av en inloggning. Låser upp routen "Favoriter" i navBar,

## Tech/Packages
#### Vite
#### React
#### React Router (react-router-dom)
#### Axios
#### i18next + react-i18next + i18next-browser-languagedetector
#### ESLint
#### @eslint/js (ESLint parser/config helper)
#### eslint-plugin-react-hooks
#### vite-plugin-react (@vitejs/plugin-react)
#### TypeScript-typer (only @types/react, @types/react-dom) — if you used them
#### Babel ( @babel/core, @rolldown/plugin-babel, babel-plugin-react-compiler ) — if used in build
#### React Feather (icons)
#### Node.js / Express
#### CORS
#### dotenv
#### PostgreSQL client (pg)
#### nodemon (dev)
#### globals (dev)

## Kvalitétstest
#### ESLint + minst 1 reviewer innan Merge 

## Instruktioner (Bash)
#### cd client > npm install > npm run dev
#### cd server > npm install > npm run dev


## Huvud-ansvarsområden
### Anass
#### Databas-setup & api-funktioner
### Andreas
#### FavouritesPage & FavouriteButton-funktionalitet
### Julia
#### Grafisk profil, HomePage & Recipe-komponent
### Dante
#### Searchbar-implementering & funktionalitet
### Harald
#### Workflow-setup, FilterBar-implementering & funktionalitet