module.exports = async function (context, req) {
    
    const comment = req.body;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "OK"
    };
    context.bindings.outputComment = comment;
}