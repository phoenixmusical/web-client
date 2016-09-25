const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const graphQLUtils = require('graphql/utilities');
const buildClientSchema = graphQLUtils.buildClientSchema;
const introspectionQuery = graphQLUtils.introspectionQuery;
const printSchema = graphQLUtils.printSchema;

const schemaPath = path.join(__dirname, 'schema');

const SERVER = 'http://localhost:3000/graphql';

// Save JSON of full schema introspection for Babel Relay Plugin to use
fetch(`${SERVER}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: introspectionQuery }),
}).then(res => res.json()).then(schemaJSON => {
    fs.writeFileSync(
        `${schemaPath}.json`,
        JSON.stringify(schemaJSON, null, 2)
    );

    // Save user readable type system shorthand of schema
    const graphQLSchema = buildClientSchema(schemaJSON.data);
    fs.writeFileSync(
        `${schemaPath}.graphql`,
        printSchema(graphQLSchema)
    );
});
