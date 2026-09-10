// API

window.CONTACT_API_URL =
    "http://localhost:3000/contacts";


// HTML ELEMENTS

const contactList =
    document.getElementById("contactList");

const searchInput =
    document.getElementById("searchInput");


// STORE CONTACTS

let contacts = [];


// GET CONTACTS
async function getContacts() {

    try {

        const response =
            await fetch(
                window.CONTACT_API_URL
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch contacts"
            );

        }


        contacts =
            await response.json();


        displayContacts(contacts);


    } catch (error) {

        console.log(error);


        contactList.innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    Unable to load contacts.

                </div>

            </div>

        `;

    }

}

// DISPLAY CONTACTS

function displayContacts(contactArray) {

    contactList.innerHTML = "";


    // NO CONTACTS

    if (contactArray.length === 0) {

        contactList.innerHTML = `

            <div class="col-12 text-center">

                <div class="alert alert-info">

                    <i class="fa-solid fa-address-book"></i>

                    No contacts found.

                </div>

            </div>

        `;

        return;

    }


    // CONTACT CARDS

    contactArray.forEach(
        function (contact) {

            contactList.innerHTML += `

                <div class="col-12 col-md-6 col-lg-4">

                    <div class="contact-card">


                        <!-- PROFILE -->

                        <div class="text-center mb-3">

                            <img

                                src="https://i.pravatar.cc/100?u=${contact.id}"

                                alt="${contact.name}"

                                class="contact-image">

                        </div>


                        <!-- NAME -->

                        <h4 class="contact-name text-center">

                            ${contact.name}

                        </h4>


                        <!-- MOBILE -->

                        <div class="contact-detail">

                            <i class="fa-solid fa-phone"></i>

                            ${contact.mobile}

                        </div>


                        <!-- EMAIL -->

                        <div class="contact-detail">

                            <i class="fa-solid fa-envelope"></i>

                            ${contact.email}

                        </div>


                        <!-- ADDRESS -->

                        <div class="contact-detail">

                            <i class="fa-solid fa-location-dot"></i>

                            ${contact.address}

                        </div>


                        <!-- BUTTONS -->

                        <div class="row g-2 mt-3">


                            <!-- VIEW -->

                            <div class="col">

                                <button

                                    class="btn btn-info text-white w-100"

                                    onclick="viewContact('${contact.id}')">

                                    <i class="fa-solid fa-eye"></i>

                                    View

                                </button>

                            </div>


                            <!-- EDIT -->

                            <div class="col">

                                <button

                                    class="btn btn-warning w-100"

                                    onclick="editContact('${contact.id}')">

                                    <i class="fa-solid fa-pen"></i>

                                    Edit

                                </button>

                            </div>


                            <!-- DELETE -->

                            <div class="col">

                                <button

                                    class="btn btn-danger w-100"

                                    onclick="handleDelete('${contact.id}')">

                                    <i class="fa-solid fa-trash"></i>

                                    Delete

                                </button>

                            </div>


                        </div>

                    </div>

                </div>

            `;

        }
    );

}

// SEARCH

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            searchInput.value
                .toLowerCase();


        const filteredContacts =
            contacts.filter(
                function (contact) {

                    return (

                        contact.name
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        contact.mobile
                            .includes(searchText)

                        ||

                        contact.email
                            .toLowerCase()
                            .includes(searchText)

                    );

                }
            );


        displayContacts(
            filteredContacts
        );

    }
);


// EDIT PAGE

function editContact(id) {

    window.location.href =
        `contact.html?id=${id}`;

}

// VIEW CONTACT

function viewContact(id) {

    const contact =
        contacts.find(
            function (contact) {

                return contact.id == id;

            }
        );


    if (!contact) {

        return;

    }


    const modalTitle =
        document.getElementById(
            "viewModalTitle"
        );


    const modalBody =
        document.getElementById(
            "viewModalBody"
        );


    modalTitle.textContent =
        contact.name;


    modalBody.innerHTML = `

        <img

            src="https://i.pravatar.cc/100?u=${contact.id}"

            alt="${contact.name}"

            class="view-profile">


        <div class="view-detail">

            <i class="fa-solid fa-user"></i>

            ${contact.name}

        </div>


        <div class="view-detail">

            <i class="fa-solid fa-phone"></i>

            ${contact.mobile}

        </div>


        <div class="view-detail">

            <i class="fa-solid fa-envelope"></i>

            ${contact.email}

        </div>


        <div class="view-detail">

            <i class="fa-solid fa-location-dot"></i>

            ${contact.address}

        </div>

    `;


    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "viewModal"
            )
        );


    modal.show();

}

// DELETE HANDLER

async function handleDelete(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this contact?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        await deleteContact(id);


        // Refresh list

        getContacts();


    } catch (error) {

        console.log(error);


        alert(
            "Unable to delete contact."
        );

    }

}

// LOAD CONTACTS

getContacts();