
// UPDATE CONTACT

async function updateContact(
    id,
    contact
) {

    const response =
        await fetch(
            `${window.CONTACT_API_URL}/${id}`,
            {

                method: "PUT",

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
            "Unable to update contact"
        );

    }


    return response.json();

}