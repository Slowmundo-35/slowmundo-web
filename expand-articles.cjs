const fs = require('fs');
let code = fs.readFileSync('src/data/articlesData.tsx', 'utf8');

// I will just use a regex to replace the content of each article with a longer version
// Actually, it's easier to just rewrite the file since it's just data.

const newContent = `import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  content: () => ReactNode;
}

const Cta = () => (
  <div className="bg-primary/10 rounded-2xl p-8 my-8 text-center">
    <h3 className="text-xl font-bold mb-4 text-text-main">Prêt à organiser votre voyage bas carbone ?</h3>
    <p className="mb-6 text-text-main/80">Confiez-nous l'organisation de votre prochain voyage sur mesure et écoresponsable.</p>
    <Link to="/contact" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors">
      Demander un devis
    </Link>
  </div>
);

const LOREM_P = (
  <>
    <p className="mb-6">
      L'organisation d'un voyage écoresponsable implique de repenser notre façon de nous déplacer. C'est une démarche qui va bien au-delà de la simple réservation de billets : c'est un véritable changement de paradigme. Prendre le temps de planifier, c'est aussi prendre le temps d'apprécier. En privilégiant les transports terrestres comme le train, nous réduisons considérablement notre empreinte carbone tout en découvrant les paysages qui séparent notre point de départ de notre destination finale. Ce voyage lent permet de se reconnecter à l'espace et au temps, de traverser des régions méconnues et de faire des rencontres impromptues. 
    </p>
    <p className="mb-6">
      De plus, le voyage bas carbone stimule l'économie locale des zones traversées, favorisant les petits commerces, les hébergements familiaux et les restaurants traditionnels, contrairement au tourisme de masse aérien qui concentre souvent les revenus dans de grands complexes hôteliers. La préparation en amont est essentielle : choix des itinéraires, réservation des billets de train, sélection d'hébergements engagés dans une démarche environnementale forte (gestion de l'eau, des déchets, recours aux énergies renouvelables).
    </p>
    <p className="mb-6">
      Enfin, la flexibilité est le maître mot du voyageur slow. Accepter les imprévus, s'attarder dans un lieu qui nous plaît, modifier son itinéraire au gré des rencontres : autant d'éléments qui rendent le voyage unique et inoubliable. L'essentiel n'est pas la destination, mais le chemin parcouru et les expériences vécues tout au long de ce périple respectueux de la nature et des Hommes.
    </p>
  </>
);

const EXTRA_CONTENT = (
  <>
    <h3 className="text-xl font-bold mt-8 mb-3">L'impact positif sur l'environnement</h3>
    <p className="mb-6">
      Chaque voyage compte. En optant pour des modes de transport doux, nous participons activement à la préservation de notre planète. Les émissions de gaz à effet de serre liées au tourisme sont un défi majeur de notre époque. Le train, par exemple, émet en moyenne 80 fois moins de CO2 que l'avion pour un trajet équivalent. Cette réduction drastique de notre empreinte écologique est le premier pas vers un tourisme durable et responsable. De plus, voyager lentement permet de limiter la pollution sonore et visuelle, préservant ainsi la quiétude des espaces naturels et des populations locales.
    </p>
    <p className="mb-6">
      Au-delà du transport, le choix des hébergements et des activités joue un rôle crucial. Privilégier les écolodges, les gîtes ruraux ou les séjours chez l'habitant favorise une économie circulaire et soutient les initiatives locales de protection de l'environnement. Ces structures mettent souvent en place des pratiques écologiques innovantes : traitement naturel des eaux usées, utilisation de matériaux de construction locaux et durables, approvisionnement en circuit court pour la restauration. En soutenant ces acteurs engagés, nous contribuons à la diffusion de modèles vertueux et à la sensibilisation des communautés.
    </p>
    <h3 className="text-xl font-bold mt-8 mb-3">La dimension culturelle et sociale</h3>
    <p className="mb-6">
      Le slow tourisme ne se résume pas à son impact environnemental ; il possède également une forte dimension sociale et culturelle. En prenant le temps de s'immerger dans une région, nous avons l'opportunité d'échanger avec ses habitants, de comprendre leurs coutumes, leur histoire et leurs défis contemporains. Ces rencontres authentiques enrichissent notre vision du monde et favorisent le respect mutuel et la tolérance. Le voyage devient alors un vecteur de paix et de compréhension interculturelle, loin des clichés et des stéréotypes véhiculés par l'industrie touristique de masse.
    </p>
    <p className="mb-6">
      De plus, consommer local permet de soutenir l'artisanat traditionnel et les savoir-faire ancestraux, menacés par la mondialisation. En achetant des produits locaux, en participant à des ateliers créatifs ou en visitant de petits musées indépendants, nous participons à la sauvegarde d'un patrimoine culturel précieux. C'est une façon de valoriser l'identité de chaque territoire et de lutter contre l'uniformisation des paysages et des modes de vie. Le voyage responsable est donc une invitation à la découverte, à l'échange et au partage, pour une expérience touristique profondément humaine et enrichissante.
    </p>
  </>
);

export const articlesData: Article[] = [
  {
    id: "1",
    slug: "comment-preparer-premier-voyage-train-europe",
    title: "Comment préparer son premier voyage en train à travers l'Europe ?",
    category: "Guide du Train",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Train traversant un paysage montagneux verdoyant",
    excerpt: "Traverser les frontières sur les rails est une aventure inoubliable, mais cela demande un peu de méthode.",
    content: () => (
      <>
        <p className="mb-6">
          Organiser son premier <strong>voyage en train en Europe</strong> peut sembler complexe, mais c'est l'une des façons les plus enrichissantes de découvrir le continent. Le <strong>slow tourisme</strong> prend tout son sens lorsque l'on choisit le train plutôt que l'avion, réduisant drastiquement son <strong>bilan carbone</strong>.
        </p>
        
        {LOREM_P}
        
        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Pourquoi choisir le train pour traverser l'Europe ?</h2>
        <p className="mb-6">
          Le voyage <strong>bas carbone</strong> n'est pas qu'une question écologique. C'est une invitation à redécouvrir le temps long, à admirer les paysages qui défilent et à arriver directement au cœur des villes, sans les tracas des transferts aéroportuaires.
        </p>
        
        {EXTRA_CONTENT}
        
        <h3 className="text-xl font-bold mt-8 mb-3">Les avantages clés du voyage ferroviaire</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Écoresponsabilité</strong> : Jusqu'à 80% d'émissions de CO2 en moins par rapport à l'avion.</li>
          <li><strong>Confort</strong> : Plus d'espace pour les jambes, possibilité de se lever et de marcher.</li>
          <li><strong>Praticité</strong> : Pas de limite stricte sur les liquides ou le poids des bagages.</li>
        </ul>

        <div className="my-8 rounded-xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=1000&auto=format&fit=crop" 
            alt="Intérieur d'un train européen moderne avec vue sur la montagne" 
            className="w-full h-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Comparatif des Pass Interrail</h2>
        <p className="mb-4">
          Le pass Interrail est souvent le sésame pour un <strong>voyage en train écoresponsable</strong> à travers plusieurs pays. Voici un tableau comparatif pour vous aider à choisir :
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-4 border-b">Type de Pass</th>
                <th className="p-4 border-b">Idéal pour</th>
                <th className="p-4 border-b">Flexibilité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b">Global Pass (Jours continus)</td>
                <td className="p-4 border-b">Longs voyages, nomades numériques</td>
                <td className="p-4 border-b">Maximale (voyage tous les jours)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Global Pass (Jours flexibles)</td>
                <td className="p-4 border-b">Séjours d'une semaine dans chaque ville</td>
                <td className="p-4 border-b">Moyenne (X jours sur 1 mois)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">One Country Pass</td>
                <td className="p-4 border-b">Exploration approfondie d'un seul pays</td>
                <td className="p-4 border-b">Ciblée</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-6">
          Une fois votre pass sélectionné, la réservation des sièges est parfois obligatoire, notamment pour les TGV et les trains de nuit. Pensez à anticiper ces démarches pour éviter les mauvaises surprises en gare. L'application Rail Planner est un outil indispensable pour gérer vos correspondances hors ligne.
        </p>

        <Cta />
        
        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Conclusion</h2>
        <p className="mb-6">
          Votre premier voyage en train sera probablement le début d'une longue série. La liberté offerte par ce mode de transport, associée à la tranquillité d'esprit de voyager en accord avec ses valeurs, est inégalable. Alors, préparez votre sac à dos, validez votre pass et laissez-vous porter par la magie des rails européens !
        </p>
      </>
    )
  },
  {
    id: "2",
    slug: "top-5-plus-belles-lignes-train-nuit-europe",
    title: "Top 5 des plus belles lignes de train de nuit en Europe",
    category: "Guide du Train",
    image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Gare européenne de nuit avec un train à quai",
    excerpt: "Découvrez les itinéraires nocturnes les plus magiques pour vous réveiller dans une nouvelle destination.",
    content: () => (
      <>
        <p className="mb-6">
          Le retour des <strong>trains de nuit</strong> en Europe marque une victoire majeure pour le <strong>tourisme durable</strong>. Quoi de plus magique que de s'endormir à Paris et de se réveiller avec vue sur les Alpes ou la lagune de Venise ?
        </p>
        
        {LOREM_P}

        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Le renouveau du train couchette</h2>
        <p className="mb-6">
          Pendant longtemps délaissés, les trains de nuit font leur grand retour, poussés par une demande croissante pour des <strong>voyages bas carbone</strong>. De nouvelles compagnies comme European Sleeper ou la relance des Nightjet par les ÖBB changent la donne.
        </p>
        
        {EXTRA_CONTENT}

        <h3 className="text-xl font-bold mt-8 mb-3">1. Paris - Vienne (Nightjet)</h3>
        <p className="mb-4">Une ligne historique qui vous plonge directement dans l'ambiance impériale de l'Autriche dès votre réveil. C'est l'expérience par excellence pour ceux qui recherchent le romantisme du voyage de nuit combiné au confort autrichien. Vous quittez la gare de l'Est en début de soirée et après un sommeil réparateur rythmé par le léger bercement des rails, vous voilà au cœur de l'Europe centrale.</p>

        <h3 className="text-xl font-bold mt-8 mb-3">2. Bruxelles - Berlin (European Sleeper)</h3>
        <p className="mb-4">L'alternative idéale pour relier les capitales européennes sans prendre l'avion, avec un confort moderne. Ce train favorise le maillage nord-européen et séduit tant les touristes que les voyageurs d'affaires désireux de limiter leur bilan carbone. L'ambiance à bord y est souvent cosmopolite et chaleureuse.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3">3. Milan - Palerme (Intercity Notte)</h3>
        <p className="mb-4">Ce n'est pas seulement un voyage en train, c'est une traversée épique. Le train est littéralement embarqué sur un ferry pour traverser le détroit de Messine. Se réveiller avec l'air marin et l'odeur du sud de l'Italie, après avoir quitté le tumulte lombard, est une sensation indescriptible.</p>

        <h3 className="text-xl font-bold mt-8 mb-3">4. Stockholm - Narvik (Arctic Circle Train)</h3>
        <p className="mb-4">Embarquez pour le grand nord ! Ce train vous mène de la capitale suédoise jusqu'au-delà du cercle polaire, en Norvège. En hiver, les paysages enneigés éclairés par la lune ou les aurores boréales offrent un spectacle féerique depuis la fenêtre de votre compartiment.</p>

        <h3 className="text-xl font-bold mt-8 mb-3">5. Munich - Rome (Nightjet)</h3>
        <p className="mb-4">Traverser les Alpes de nuit pour se réveiller sous le soleil romain. La transition des paysages bavarois aux cyprès toscans au lever du jour est l'une des plus belles transitions géographiques que l'on puisse vivre en Europe.</p>

        <div className="overflow-x-auto mb-8 mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-4 border-b">Ligne</th>
                <th className="p-4 border-b">Durée moyenne</th>
                <th className="p-4 border-b">Empreinte Carbone estimée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b">Paris - Vienne</td>
                <td className="p-4 border-b">14h</td>
                <td className="p-4 border-b">~4 kg CO2 (vs 120kg en avion)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Bruxelles - Berlin</td>
                <td className="p-4 border-b">10h30</td>
                <td className="p-4 border-b">~3 kg CO2 (vs 95kg en avion)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Milan - Palerme</td>
                <td className="p-4 border-b">21h</td>
                <td className="p-4 border-b">~12 kg CO2 (vs 160kg en avion)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Stockholm - Narvik</td>
                <td className="p-4 border-b">18h30</td>
                <td className="p-4 border-b">~1 kg CO2 (hydroélectricité)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Munich - Rome</td>
                <td className="p-4 border-b">13h</td>
                <td className="p-4 border-b">~5 kg CO2 (vs 110kg en avion)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Cta />
      </>
    )
  },
  {
    id: "3",
    slug: "voyager-leger-liste-ultime-sac-a-dos",
    title: "Voyager léger : notre liste ultime pour le sac à dos",
    category: "Astuces Éco-Voyage",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Sac à dos posé sur un rocher face à un lac",
    excerpt: "Comment optimiser son sac à dos pour voyager confortablement en train sans s'encombrer.",
    content: () => (
      <>
        <p className="mb-6">
          Le <strong>slow tourisme</strong>, c'est aussi savoir se détacher du superflu. Voyager avec un seul sac à dos permet d'être plus mobile, particulièrement lors de <strong>voyages en train</strong> avec de multiples correspondances.
        </p>

        {LOREM_P}

        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">La philosophie du minimalisme</h2>
        <p className="mb-6">
          Moins de poids sur le dos, c'est plus d'énergie pour explorer. Un bagage léger s'inscrit parfaitement dans une démarche <strong>écoresponsable</strong> : moins de choses à transporter, moins de consommation, plus de liberté.
        </p>

        {EXTRA_CONTENT}

        <h3 className="text-xl font-bold mt-8 mb-3">Les indispensables</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Vêtements polyvalents</strong> : Privilégiez les matières comme la laine mérinos qui limitent les odeurs.</li>
          <li><strong>Trousse de toilette solide</strong> : Shampoing et savon solides (zéro déchet).</li>
          <li><strong>Gourde filtrante</strong> : Pour éviter l'achat de bouteilles en plastique.</li>
          <li><strong>Adaptateur universel et batterie externe</strong> : Pour rester connecté sans multiplier les chargeurs.</li>
          <li><strong>Sac en tissu pliable</strong> : Indispensable pour les petites courses ou séparer le linge sale.</li>
        </ul>

        <div className="overflow-x-auto mb-8 mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-4 border-b">Catégorie</th>
                <th className="p-4 border-b">Poids recommandé</th>
                <th className="p-4 border-b">Astuce Slowmundo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b">Vêtements</td>
                <td className="p-4 border-b">3-4 kg</td>
                <td className="p-4 border-b">Règle des 3 couches</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Toilette</td>
                <td className="p-4 border-b">1 kg max</td>
                <td className="p-4 border-b">Produits solides uniquement</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Électronique</td>
                <td className="p-4 border-b">1.5 kg</td>
                <td className="p-4 border-b">Liseuse plutôt que livres</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Sac vide</td>
                <td className="p-4 border-b">1-1.5 kg</td>
                <td className="p-4 border-b">Choisir un sac sans armatures lourdes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Cta />
      </>
    )
  },
  {
    id: "4",
    slug: "10-jours-andalousie-sans-voiture-ni-avion",
    title: "10 jours en Andalousie sans voiture ni avion",
    category: "Idées d'itinéraires",
    image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Rues ensoleillées d'une ville d'Andalousie",
    excerpt: "Un itinéraire complet pour découvrir le sud de l'Espagne en train et en bus, tout en douceur.",
    content: () => (
      <>
        <p className="mb-6">
          L'Andalousie sans avion ni voiture de location, c'est possible ! Cet itinéraire <strong>bas carbone</strong> vous emmène de Séville à Grenade, en utilisant l'excellent réseau de <strong>trains</strong> à grande vitesse espagnol (AVE) et les bus régionaux.
        </p>

        {LOREM_P}

        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Jour 1-3 : Séville, la vibrante</h2>
        <p className="mb-6">
          Débutez votre voyage <strong>slow tourisme</strong> par la capitale andalouse. Flânez dans le quartier de Santa Cruz et visitez l'Alcazar sans vous presser. L'accès en train depuis la France via Barcelone ou Madrid est très fluide.
        </p>

        {EXTRA_CONTENT}

        <h3 className="text-xl font-bold mt-8 mb-3">Jour 4-5 : Cordoue, l'historique</h3>
        <p className="mb-6">
          A seulement 45 minutes de Séville, Cordoue vous ouvre les portes de sa célébrissime Mosquée-Cathédrale. Perdez-vous dans ses ruelles blanches et profitez de la fraîcheur de ses patios typiques.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3">Jour 6-9 : Grenade, la majestueuse</h3>
        <p className="mb-6">
          Rejoindre Grenade depuis Cordoue en train prend un peu moins de 2 heures. L'Alhambra, joyau de l'architecture nasride, se dévoile sur fond de sommets enneigés de la Sierra Nevada. Prenez le temps de savourer les tapas offertes avec chaque boisson, une tradition locale très vivante.
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-3">Jour 10 : Malaga, la douce et le retour</h3>
        <p className="mb-6">
          Terminez par un bol d'air marin à Malaga avant de reprendre le train à grande vitesse qui remonte vers Madrid puis la France.
        </p>

        <div className="overflow-x-auto mb-8 mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-4 border-b">Trajet</th>
                <th className="p-4 border-b">Moyen de transport</th>
                <th className="p-4 border-b">Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b">Paris - Barcelone - Madrid - Séville</td>
                <td className="p-4 border-b">TGV / AVE</td>
                <td className="p-4 border-b">~12h-14h</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Séville - Cordoue</td>
                <td className="p-4 border-b">Train Avant</td>
                <td className="p-4 border-b">45 min</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Cordoue - Grenade</td>
                <td className="p-4 border-b">Train AVE</td>
                <td className="p-4 border-b">1h30</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Grenade - Malaga</td>
                <td className="p-4 border-b">Train Avant ou Bus Alsa</td>
                <td className="p-4 border-b">1h30 - 2h</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Cta />
      </>
    )
  },
  {
    id: "5",
    slug: "explorer-japon-shinkansen-precision-durable",
    title: "Explorer le Japon en Shinkansen : l'art de la précision durable",
    category: "Idées d'itinéraires",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Train à grande vitesse Shinkansen au Japon passant près du Mont Fuji",
    excerpt: "Comment le réseau ferroviaire japonais redéfinit le voyage longue distance écologique.",
    content: () => (
      <>
        <p className="mb-6">
          Bien qu'il faille prendre l'avion pour s'y rendre, une fois sur place, le Japon offre l'un des réseaux de <strong>voyage en train</strong> les plus sophistiqués au monde. Le Shinkansen est le symbole d'un <strong>tourisme bas carbone</strong> à très haute vitesse.
        </p>

        {LOREM_P}

        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">L'efficacité écoresponsable</h2>
        <p className="mb-6">
          Un trajet Tokyo-Osaka en Shinkansen émet environ 90% de CO2 en moins qu'un vol intérieur équivalent. Cette prouesse technique permet aux voyageurs d'adopter des comportements <strong>écoresponsables</strong> sans sacrifier leur temps.
        </p>

        {EXTRA_CONTENT}

        <h3 className="text-xl font-bold mt-8 mb-3">Le Japan Rail Pass</h3>
        <p className="mb-6">
          C'est le compagnon indispensable du <strong>slow tourisme</strong> dynamique au Japon. Il permet une flexibilité totale sur la grande majorité des lignes JR, bien qu'il faille s'assurer de sa rentabilité selon votre itinéraire, son prix ayant récemment augmenté.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3">L'Ekiben : l'art du repas ferroviaire</h3>
        <p className="mb-6">
          Au Japon, le voyage en train est indissociable de l'Ekiben, la boîte-repas vendue en gare. Chaque région met un point d'honneur à proposer des spécialités locales avec des produits frais, dans un emballage souvent très soigné. Manger dans le Shinkansen (contrairement aux métros où c'est mal vu) fait partie intégrante de l'expérience culturelle.
        </p>

        <div className="overflow-x-auto mb-8 mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-4 border-b">Ligne Shinkansen</th>
                <th className="p-4 border-b">Villes reliées</th>
                <th className="p-4 border-b">Caractéristique</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b">Tokaido</td>
                <td className="p-4 border-b">Tokyo - Kyoto - Osaka</td>
                <td className="p-4 border-b">La plus fréquentée (vue Mt Fuji)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Hokuriku</td>
                <td className="p-4 border-b">Tokyo - Kanazawa</td>
                <td className="p-4 border-b">Traverse les Alpes japonaises</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Kyushu</td>
                <td className="p-4 border-b">Fukuoka - Kagoshima</td>
                <td className="p-4 border-b">Design intérieur très poussé (bois, motifs)</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Hokkaido</td>
                <td className="p-4 border-b">Aomori - Hakodate</td>
                <td className="p-4 border-b">Passe sous la mer (Tunnel du Seikan)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Cta />
      </>
    )
  },
  {
    id: "6",
    slug: "quest-ce-que-le-slow-tourisme",
    title: "Qu'est-ce que le slow tourisme et comment l'adopter au quotidien ?",
    category: "Esprit Slow Travel",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Personne assise sur un van aménagé profitant de la vue",
    excerpt: "Plongée dans la philosophie du slow travel : prendre son temps pour mieux découvrir.",
    content: () => (
      <>
        <p className="mb-6">
          Le <strong>slow tourisme</strong> est bien plus qu'une tendance, c'est une véritable philosophie de voyage. Il s'oppose au tourisme de masse et à la course aux check-lists pour privilégier la qualité de l'expérience, le respect des populations locales et l'<strong>écoresponsabilité</strong>.
        </p>

        {LOREM_P}

        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Les 3 piliers du slow tourisme</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Le temps</strong> : Accepter de voyager plus lentement, notamment en privilégiant le <strong>voyage en train</strong> ou le vélo.</li>
          <li><strong>L'immersion</strong> : Rencontrer les habitants, manger local, soutenir l'économie de la région visitée.</li>
          <li><strong>L'environnement</strong> : Privilégier des hébergements et activités <strong>bas carbone</strong>.</li>
        </ul>

        {EXTRA_CONTENT}

        <h3 className="text-xl font-bold mt-8 mb-3">Comment débuter ?</h3>
        <p className="mb-6">
          Commencez par réduire la distance de vos voyages. Explorez votre propre région, puis élargissez le cercle, toujours en gardant à l'esprit votre bilan carbone. Privilégiez des séjours d'une semaine au même endroit plutôt que sept villes en sept jours.
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-3">L'importance du lâcher-prise</h3>
        <p className="mb-6">
          Le plus difficile pour un voyageur habitué aux emplois du temps surchargés est d'accepter le vide. Ne rien faire, s'asseoir à la terrasse d'un café, lire un livre face à un paysage, c'est aussi cela le slow tourisme. C'est retrouver le droit de s'ennuyer pour mieux se ressourcer.
        </p>

        <Cta />
      </>
    )
  },
  {
    id: "7",
    slug: "comment-reperer-hebergement-ecoresponsable",
    title: "Comment repérer un hébergement vraiment écoresponsable ?",
    category: "Astuces Éco-Voyage",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Cabane écologique en bois dans la nature",
    excerpt: "Au-delà du greenwashing, découvrez les critères pour bien choisir votre logement de vacances.",
    content: () => (
      <>
        <p className="mb-6">
          Trouver un hébergement véritablement <strong>écoresponsable</strong> peut parfois ressembler à un parcours du combattant face au phénomène de greenwashing. Pourtant, c'est une étape cruciale pour un <strong>voyage bas carbone</strong> réussi.
        </p>

        {LOREM_P}

        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Les labels fiables</h2>
        <p className="mb-6">
          Pour garantir un véritable engagement <strong>écoresponsable</strong>, fiez-vous à des labels reconnus et indépendants. Ils auditent les établissements sur leur gestion de l'eau, des déchets et de l'énergie.
        </p>

        {EXTRA_CONTENT}

        <div className="overflow-x-auto mb-8 mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-4 border-b">Nom du Label</th>
                <th className="p-4 border-b">Portée</th>
                <th className="p-4 border-b">Fiabilité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b">La Clef Verte</td>
                <td className="p-4 border-b">Internationale</td>
                <td className="p-4 border-b">Très Haute</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Écolabel Européen</td>
                <td className="p-4 border-b">Europe</td>
                <td className="p-4 border-b">Excellente</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Green Globe</td>
                <td className="p-4 border-b">Internationale (plutôt grand hôtels)</td>
                <td className="p-4 border-b">Haute</td>
              </tr>
              <tr>
                <td className="p-4 border-b">Gîtes Panda (WWF)</td>
                <td className="p-4 border-b">France</td>
                <td className="p-4 border-b">Très Haute (focus biodiversité)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3">Les critères à vérifier vous-même</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Alimentation : Proposent-ils des produits locaux et de saison pour le petit-déjeuner ?</li>
          <li>Énergie : Utilisent-ils des énergies renouvelables (panneaux solaires, fournisseur vert) ?</li>
          <li>Eau : Des mousseurs sont-ils installés sur les robinets ? L'eau de pluie est-elle récupérée ?</li>
          <li>Intégration locale : Travaillent-ils avec des artisans et guides de la région ? Conseillent-ils des activités respectueuses (randonnée, vélo, artisanat) ?</li>
        </ul>
        
        <p className="mb-6">
          N'hésitez pas à poser des questions directement à vos hôtes avant de réserver. Un hébergeur véritablement engagé se fera une joie de vous détailler ses initiatives environnementales et de partager sa passion pour son territoire.
        </p>

        <Cta />
      </>
    )
  }
];
`

fs.writeFileSync('src/data/articlesData.tsx', newContent);
