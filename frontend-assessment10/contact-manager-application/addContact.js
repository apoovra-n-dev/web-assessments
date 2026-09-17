
// ADD CONTACT

async function addContact(contact) {

    const response =
        await fetch(
            window.CONTACT_API_URL,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(contact)

            }
        );


    if (!response.ok) {

        throw new Error(
            "Unable to add contact"
        );

    }


    return response.json();

}