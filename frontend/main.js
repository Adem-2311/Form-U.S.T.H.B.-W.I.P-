document.getElementById('submit-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    const formationMaster = document.getElementById('formation-master').value;
    const lastName = document.getElementById('nom').value;
    const firstName = document.getElementById('prenom').value;
    const dateOfBirth = document.getElementById('date-of-birth').value;
    const wilaya = document.getElementById('wilaya').value;
    const address = document.getElementById('address').value;
    const codePostal = document.getElementById('code-postal').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    const matriculeBAC = document.getElementById('matricule-bac').value;
    const anneeBAC = document.getElementById('annee-bac').value;
    const moyenneBAC = document.getElementById('moyenne-bac').value;
    const serieBAC = document.getElementById('serie-bac').value;
    const mentionBAC = document.getElementById('mention-bac').value;
    const matricule = document.getElementById('matricule').value;
    const natureDiplome = document.getElementById('nature-diplome').value;
    const domaine = document.getElementById('domaine').value;
    const filliere = document.getElementById('filliere').value;
    const specialite = document.getElementById('specialite').value;
    const niveauEtude = document.getElementById('niveau-etude').value;
    const dernierSemestre = document.getElementById('dernier-semestre').value;
    const soutnancePFE = document.getElementById('soutenance-pfe').value;

    const formData = {
        formationMaster,
        lastName,
        firstName,
        dateOfBirth,
        wilaya,
        address,
        codePostal,
        phoneNumber,
        email,
        matriculeBAC,
        anneeBAC,
        moyenneBAC,
        serieBAC,
        mentionBAC,
        matricule,
        natureDiplome,
        domaine,
        filliere,
        specialite,
        niveauEtude,
        dernierSemestre,
        soutnancePFE
    };

    console.log(formData);

    try {
        const response = await fetch('/post-user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('An error occured when sending data to the server or puting data in the database');
        }
        console.log('Message from the frontend: Data inserted!!')
    }
    catch (error) {
        console.error(error.message);
    }
});