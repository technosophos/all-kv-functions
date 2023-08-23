// Note that we import Kv along with the HTTP stuff.
import { HandleRequest, HttpRequest, HttpResponse, Kv } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  // In `spin.toml` we declare that we need a default store by adding this:
  // key_value_stores = ["default"]
  // Note that it is named "default", which makes it the default KV.

  // Open a connection to the default KV store
  let store = Kv.openDefault();    // Open the default store.
  let store2 = Kv.open("default"); // Same as above

  // Lets create a key/value pair with two strings:
  store.set("name", "Pet Database")

  // Now let's create one with a string key and a JSON body:
  let myPets = [
    { name: "Tiberius", type: "dog" },
    { name: "Julius", type: "cat" },
    { name: "Toez", type: "cat" }
  ]
  store2.setJson("pets", myPets)

  // Note that store and store2 are actually connected to the same
  // Kv store. We can verify this by checking that the keys both exist.
  if (!store.exists("pets")) {
    console.log("expected 'pets' to exist in store")
  }
  if (!store2.exists("name")) {
    console.log("expected 'name' to exist in store2")
  }

  // We can get a list of all of the keys out of the DB.
  let keys = store.getKeys().join(", ")
  console.log("The keys in the DB are: " + keys)

  // Now we can get values back out. Note that the value is an array buffer,
  // so we have to convert it back to a string.
  let siteName = store.get("name")
  let dec = new TextDecoder("utf-8")
  // This will print "Pet Database" to the log
  console.log("Site name: " + dec.decode(siteName))

  // A non-existent key comes back with a null value.
  let noSuchValue = store.get("no-such-key")
  if (noSuchValue == null) {
    console.log("Got an expected 'null' for a nonexistent key")
  }

  // We can get the JSON back like this
  let petsDB = store.getJson("pets")
  // This will print "Julius" to the log
  console.log("The second pet is named " + petsDB[1].name)

  // Unsurprisingly, we get a string if we use .get() on JSON data
  let petString = store.get("pets")
  console.log("When using get() on JSON: " + dec.decode(petString))

  // We can trap and handle errors:
  try {
    Kv.open("no-such-store")
  } catch (e: any) {
    console.log("Error opening non-existent DB: " + e)
  }

  // Getting non-JSON data as JSON throws an error:
  // We can trap and handle errors:
  try {
    store.getJson("name")
  } catch (e: any) {
    console.log("Error parsing non-JSON as if it were JSON: " + e)
  }

  // Setting the same key a second time overwrites the first one:
  let oldVal = store.get("name")
  store.set("name", "My Pets")
  let newVal = store.get("name")
  console.log("Replaced " + dec.decode(oldVal) + " with " + dec.decode(newVal)
  )

  // Finally, we can delete entries
  store.delete("name")
  store.delete("pets")



  // And we'll return something boring to the user.
  return {
    status: 200,
    body: encoder.encode("Check your logs for the results of this").buffer
  }
}
