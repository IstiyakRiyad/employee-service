describe('Check the server', () => {
    it('passes', () => {
        cy.request({
            url: "/",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.have.equal(404);
            expect(response.body).to.have.property("errors");
            expect(response.headers).to.have.property("content-length", "41");
        });
    })
})
