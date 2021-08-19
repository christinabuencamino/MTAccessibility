module.exports = async function (context, req) {
    const comments = context.bindings.inputComments;
    const sortedComments = comments.sort();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: sortedComments
    };
}

//swa start FrontEnd --api Functions