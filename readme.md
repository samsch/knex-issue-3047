Reproduction case related to [knex issue 3047](https://github.com/tgriesser/knex/issues/3047).

Clone, run `npm i`, and run the program with `node test.js`.

The event handler attached to `parameterizedKnex1` is triggered for queries made with both the original `knex` object and `parameterizedKnex2`.
