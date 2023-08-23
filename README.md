# Example of Every Single Spin KV Function in TypeScript

This is a TypeScript app that shows an example of every single one of [the KV function]( https://developer.fermyon.com/spin/kv-store-api-guide) that Fermyon Spin and Fermyon Cloud support.

Head to `src/index.ts` to see the examples, and `spin.toml` to see the config.

## Running the examples

If you have Spin installed, you can clone this repo, and do the following to get it up and running:

```console
$ npm init    # Install the packages
$ spin build  # Run locally
$ spin up     # Test locally
$ curl localhost:3000
$ spin deploy # Test on Fermyon Cloud
$ curl https://all-kv-functions-XXXXXX.fermyon.app // where XXXXXX is whatever code Fermyon generates for you
```

## Expected Output

The HTTP handler will return a boring response instructing you to check your logs:

```console
$ curl localhost:3000/
Check your logs for the results of this
```

Your logs will show the details of the operations:

```
The keys in the DB are: name, pets
Site name: Pet Database
Got an expected 'null' for a nonexistent key
The second pet is named Julius
When using get() on JSON: [{"name":"Tiberius","type":"dog"},{"name":"Julius","type":"cat"},{"name":"Toez","type":"cat"}]
Error opening non-existent DB: InternalError: Error::AccessDenied
Error parsing non-JSON as if it were JSON: SyntaxError: unexpected token: 'Pet'
Replaced Pet Database with My Pets
```

Using Spin locally, these will go to STDOUT. Using Fermyon Cloud, you can view this in the app's console in the web interface.
