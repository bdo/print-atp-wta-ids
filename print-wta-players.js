const params = (page) =>
  `?page=${page}&pageSize=100&type=rankSingles&sort=asc&name=&metric=SINGLES`;

const url = (page) =>
  `https://api.wtatennis.com/tennis/players/ranked${params(page)}`;

const getWTAPlayersAndIds = (page = 0, players = []) =>
  fetch(url(page))
    .then((response) => response.json())
    .then((newPlayers) => {
      if (newPlayers.length === 0) {
        return players;
      }
      return getWTAPlayersAndIds(page + 1, [...players, ...newPlayers]);
    });

const printWTAPlayersAndIds = () => {
  getWTAPlayersAndIds().then((players) => {
    console.log(
      players.map(({ player }) => `${player.id}; ${player.fullName}`).join("\n")
    );
  });
};

printWTAPlayersAndIds();
