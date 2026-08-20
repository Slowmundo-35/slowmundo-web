const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

const replacement = `<option value="" disabled>Sélectionner un pays</option>
                    <optgroup label="Europe">
                      <option value="Belgique">Belgique</option>
                      <option value="Pays-Bas">Pays-Bas</option>
                      <option value="Allemagne">Allemagne</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Autriche">Autriche</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Slovénie">Slovénie</option>
                      <option value="Slovaquie">Slovaquie</option>
                      <option value="Pologne">Pologne</option>
                      <option value="Tchéquie">Tchéquie</option>
                      <option value="Albanie">Albanie</option>
                      <option value="Grèce">Grèce</option>
                      <option value="Espagne">Espagne</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Islande">Islande</option>
                      <option value="Angleterre">Angleterre</option>
                      <option value="Irlande">Irlande</option>
                    </optgroup>
                    <optgroup label="Asie">
                      <option value="Inde">Inde</option>
                      <option value="Japon">Japon</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Malaisie">Malaisie</option>
                    </optgroup>
                    <option value="autre">Autre</option>`;

code = code.replace(/<option value="" disabled>Sélectionner<\/option>\s*<option value="europe">Europe<\/option>\s*<option value="asie">Asie<\/option>\s*<option value="autre">Autre<\/option>/, replacement);

fs.writeFileSync('src/pages/Contact.tsx', code);
