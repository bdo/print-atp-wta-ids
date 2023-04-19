import { JSDOM } from "jsdom";

const url = "https://www.atptour.com/en/rankings/singles?rankRange=1-2000";

const printATPPlayersAndIds = () => {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const dom = new JSDOM(html);
      const players = Array.from(
        dom.window.document.querySelectorAll(".player-cell-wrapper a")
      ).map((e) => ({
        name: e.text.trim(),
        id: e.href.replace(/.*\/(\w+)\/overview.*/, "$1"),
      }));
      console.log(
        players.map((player) => `${player.id}; ${player.name}`).join("\n")
      );
    });
};

printATPPlayersAndIds();
