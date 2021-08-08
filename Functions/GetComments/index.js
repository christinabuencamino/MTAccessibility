module.exports = async function (context, req) {
    const comments = context.bindings.inputComments;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: comments
    };
}

//swa start FrontEnd --api Functions