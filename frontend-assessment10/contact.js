// API

window.CONTACT_API_URL =
    "http://localhost:3000/contacts";


// HTML ELEMENTS

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formTitle =
    document.getElementById(
        "formTitle"
    );


const saveButton =
    document.getElementById(
        "saveButton"
    );


const deleteButton =
    document.getElementById(
        "deleteButton"
    );

// INPUTS

const nameInput =
    document.getElementById(
        "name"
    );


const mobileInput =
    document.getElementById(
        "mobile"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const addressInput =
    document.getElementById(
        "address"
    );


// GET ID FROM URL

const params =
    new URLSearchParams(
        window.location.search
    );


const contactId =
    params.get("id");


// ADD / EDIT MODE

if (contactId) {

    // EDIT MODE

    formTitle.textContent =
        "Edit Contact";


    saveButton.innerHTML = `

        <i class="fa-solid fa-pen"></i>

        Update Contact

    `;


    deleteButton.classList.remove(
        "d-none"
    );


    loadContact(contactId);


} else {

    // ADD MODE

    formTitle.textContent =
        "Add Contact";

}

// LOAD CONTACT

async function loadContact(id) {

    try {

        const response =
            await fetch(
                `${window.CONTACT_API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Contact not found"
            );

        }


        const contact =
            await response.json();


        // Fill form

        nameInput.value =
            contact.name || "";


        mobileInput.value =
            contact.mobile || "";


        emailInput.value =
            contact.email || "";


        addressInput.value =
            contact.address || "";


    } catch (error) {

        console.log(error);


        alert(
            "Unable to load contact."
        );


        goBack();

    }

}


// FORM SUBMIT

contactForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Create object

        const contact = {

            name:
                nameInput.value,

            mobile:
                mobileInput.value,

            email:
                emailInput.value,

            address:
                addressInput.value

        };


        try {

            if (contactId) {

                // UPDATE

                await updateContact(
                    contactId,
                    contact
                );


            } else {

                // ADD

                await addContact(
                    contact
                );

            }


            // Go to home

            window.location.href =
                "index.html";


        } catch (error) {

            console.log(error);


            alert(
                "Unable to save contact."
            );

        }

    }
);

// DELETE FROM EDIT PAGE

deleteButton.addEventListener(
    "click",
    async function () {

        const confirmDelete =
            confirm(
                "Are you sure you want to delete this contact?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteContact(
                contactId
            );


            // Go home

            window.location.href =
                "index.html";


        } catch (error) {

            console.log(error);


            alert(
                "Unable to delete contact."
            );

        }

    }
);


// BACK / CANCEL

function goBack() {

    window.location.href =
        "index.html";

}