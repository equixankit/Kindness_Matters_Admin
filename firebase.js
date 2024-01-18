import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyACVRzbJkG_sOwRJ8Ae5TaZJRdQCHrVvok",
    authDomain: "kindness-matters-1.firebaseapp.com",
    projectId: "kindness-matters-1",
    storageBucket: "kindness-matters-1.appspot.com",
    messagingSenderId: "808101063210",
    appId: "1:808101063210:web:061c2234e3999842cfb153"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const challengeForm = document.getElementById('challengeForm');
const challengeInput = document.getElementById('challengeInput');
const challengeButton = document.getElementById('addChallengeButton');
const challengeDescription = document.getElementById('challengeDescription');

challengeButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const challengeName = challengeInput.value;
    const description = challengeDescription.value;

    await addDoc(collection(db, "challenges"), {
        name: challengeName,
        description: description
    }).catch(error => {
        console.log("Error adding document: ", error);
    });

    updateChallengeList();

    challengeInput.value = '';
    challengeDescription.value = '';
});

challengeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const challengeName = challengeInput.value;
    const description = challengeDescription.value;

    await addDoc(collection(db, "challenges"), {
        name: challengeName,
        description: description
    }).catch(error => {
        console.log("Error adding document: ", error);
    });

    updateChallengeList();

    challengeInput.value = '';
    challengeDescription.value = '';
});


async function updateChallengeList() {
    const challenges = document.querySelector('#challengeList');
    challenges.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, "challenges"));
        querySnapshot.forEach((doc) => {
            let li = document.createElement('li');
            li.innerText = doc.data().name;

            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function () {
                deleteChallenge(doc.id);
            };
            li.appendChild(deleteButton);

            challenges.appendChild(li);
        });
    } catch (error) {
        console.log("Error getting documents: ", error);
    }
}

async function deleteChallenge(challengeId) {
    try {
        await deleteDoc(doc(db, "challenges", challengeId));
        updateChallengeList();
    } catch (error) {
        console.log("Error deleting document: ", error);
    }
}


updateChallengeList();


async function updateUserList() {
    const usersTableBody = document.querySelector('#userTable tbody');
    usersTableBody.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            let tr = document.createElement('tr');

            let tdName = document.createElement('td');
            tdName.innerText = doc.data().name;
            tr.appendChild(tdName);

            let tdEmail = document.createElement('td');
            tdEmail.innerText = doc.data().email;
            tr.appendChild(tdEmail);

            usersTableBody.appendChild(tr);
        });
    } catch (error) {
        console.log("Error getting documents: ", error);
    }
}

updateUserList();
