describe('Check open api', () => {
    it('passes', () => {
        cy.request({
            url: "/api/v1/employee",
        }).then((response) => {
            expect(response.status).to.have.equal(200);
            expect(response.body).to.have.property("data");
            expect(response.body).not.have.property("errors");;
        });
    })

    it('with query', () => {
        cy.request({
            url: "/api/v1/employee",
            qs: {"position_id": 2}
        }).then((response) => {
            expect(response.status).to.have.equal(200);
            expect(response.body).to.have.property("data");
            expect(response.body).not.have.property("errors");;
        });
    })

    it('with negative position_id query', () => {
        cy.request({
            url: "/api/v1/employee",
            qs: {"position_id": -2},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.have.equal(422);
            expect(response.body).to.have.property("errors");;
        });
    })

    it('with non number position_id query', () => {
        cy.request({
            url: "/api/v1/employee",
            qs: {"position_id": "ab"},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.have.equal(422);
            expect(response.body).to.have.property("errors");;
        });
    })
})
