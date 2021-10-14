describe("Make sure site loads", () => {
  beforeEach(() => {
    const API_KEY = Cypress.env("REACT_APP_MOVIE_API");
    const moviesListUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=${API_KEY}`;
    const configUrl = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;

    cy.intercept(moviesListUrl, { fixture: "moviesList" });
    cy.intercept(configUrl, { fixture: "config" });

    cy.visit("http://localhost:3000/");
    // cy.login();
  });

  it("Page loads", () => {
    cy.contains("Filter");

    cy.findAllByTestId("movies-list-movie")
      .first()
      .then(($movie) => {
        const movieUrl = $movie.attr("href");
        cy.findAllByTestId("movies-list-movie").first().click();
        cy.url().should("include", movieUrl);
      });

    expect(true).to.equal(true);
  });

  it("Correct number of movies", () => {
    cy.findAllByTestId("movies-list-movie").should("have.length", 20);
  });

  it("Understands chainers", () => {
    cy.findAllByTestId("movies-list-movie").should("have.length", 20);
    cy.findAllByTestId("movies-list-movie").should("exist");

    cy.fixture("moviesList").then((jsonData) => {
      expect(jsonData.results[0].title).to.equal("Free Guy");
    });
  });
});
