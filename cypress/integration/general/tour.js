describe("Make sure site loads", () => {
  beforeEach(() => {
    const moviesListUrl =
      "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=455d2f47b3d4190f590511e8a9ce1f13";
    const configUrl =
      "https://api.themoviedb.org/3/configuration?api_key=455d2f47b3d4190f590511e8a9ce1f13";

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
