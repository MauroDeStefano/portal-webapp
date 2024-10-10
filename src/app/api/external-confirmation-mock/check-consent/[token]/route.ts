export async function GET(
    request: Request,
    res: any,
) {
    if (res.params.token !== '065c54d9ee899a0b148dd12dbfa') {
        return Response.json({"statusCode": 500, "message": "Internal server error"}, {
            status: 500
        })
    }

    return Response.json({"consent": true, "valid_token": true});
}
