export async function POST(request: Request) {
    // return Response.json({
    //     consent: false,
    //     valid_token: true
    // });

    return Response.json({
        consent: true,
        valid_token: true
    }, {
        status: 500
    })
}
