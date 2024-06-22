describe('Check open api', () => {
    before(() => {
        cy.request({
            method: "post",
            url: "/api/v1/auth/login",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: "istiyak.riyad@gmail.com",
                password: "randompass"
            })
        }).then((response) => {
            expect(response.status).to.have.equal(200);
            expect(response.body).to.have.property("data");

            const token = response.body.data.token;
            Cypress.env("token", token)
        });
    })

    it('passes', () => {
        cy.request({
            url: "/api/v1/employee/protected",
            auth: {
                bearer: Cypress.env("token")
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.have.equal(200);
            expect(response.body).to.have.property("data");
            expect(response.body).not.have.property("errors");;
        });
    })

    it('with query', () => {
        cy.request({
            url: "/api/v1/employee",
            qs: {"position_id": 2},
            auth: {
                bearer: Cypress.env("token")
            },
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
            auth: {
                bearer: Cypress.env("token")
            },
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
            auth: {
                bearer: Cypress.env("token")
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.have.equal(422);
            expect(response.body).to.have.property("errors");;
        });
    })
})
