
// DELETE CONTACT

async function deleteContact(id) {

    const response =
        await fetch(
            `${window.CONTACT_API_URL}/${id}`,
            {

                method: "DELETE"

            }
        );


    if (!response.ok) {

        throw new Error(
            "Unable to delete contact"
        );

    }


    return true;

}