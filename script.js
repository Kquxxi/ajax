$(document).ready(function () {
  const matchInfoContainer = $('#match-info');
  const currentScoreContainer = $('#current-score');
  const chatbox = $('#chatbox');
  const matchResultContainer = $('#match-result');
  const showDiagnosticInfoCheckbox = $('#show-diagnostic-info');
  const diagnosticInfoContainer = $('#diagnostic-info');

  const messages = [
    'Minuta 0: Start meczu, zaczyna Polska',
    'Minuta 10: Żółta kartka dla San Escobar',
    'Minuta 15: Gol dla Polski!',
    'Minuta 30: Żółta kartka dla San Escobar',
    'Minuta 45: Koniec pierwszej połowy',
    'Minuta 60: Gol dla Polski!',
    'Minuta 65: Gol dla San Escobar!',
    'Minuta 69: Gol dla San Escobar!',
    'Minuta 75: Zmiana w składzie Polski',
    'Minuta 80: Gol dla Polski!',
    'Minuta 90: Koniec meczu!'
  ];

  let messageIndex = 0;
  let goalsTeamPoland = 0; 
  let goalsTeamSanEscobar = 0; 
  let matchEnded = false; 
  let lastMessages = [];

  const updateMatchReport = () => {
    if (messageIndex >= messages.length || matchEnded) {
      clearInterval(intervalId); 

      const matchResult = goalsTeamPoland === goalsTeamSanEscobar ? 'Remis' : (goalsTeamPoland > goalsTeamSanEscobar ? 'Wygrana Polski' : 'Wygrana San Escobar');
      matchResultContainer.text(`Mecz zakończony! ${matchResult}`);
      
      return;
    }

    matchInfoContainer.text('Mecz pomiędzy Polską a San Escobar');

    const newMessage = messages[messageIndex];
    lastMessages.push(newMessage);

    if (lastMessages.length > 6) {
      lastMessages.shift();
    }

    chatbox.html(lastMessages.join('<br>'));

    messageIndex = (messageIndex + 1) % messages.length;

    if (newMessage.includes('Gol')) {
      const goalRegex = /Gol dla ([A-Za-z\s]+)!/;
      const matchResult = newMessage.match(goalRegex);
      if (matchResult) {
        const scoringTeam = matchResult[1].trim();
        if (scoringTeam === 'Polski') {
          goalsTeamPoland += 1;
        } else if (scoringTeam === 'San Escobar') {
          goalsTeamSanEscobar += 1;
        }
      }
    }

    if (newMessage.includes('Koniec meczu!')) {
      matchEnded = true;
    }

    currentScoreContainer.text(`Aktualny wynik: ${goalsTeamPoland}:${goalsTeamSanEscobar}`);

    const newDiagnosticInfo = 'Kod odpowiedzi serwera: 200\nStatus: OK';
    diagnosticInfoContainer.text(newDiagnosticInfo);
  };

  const intervalId = setInterval(updateMatchReport, 2000);

  showDiagnosticInfoCheckbox.on('change', function () {
    const diagnosticInfo = diagnosticInfoContainer.text();
    if (this.checked) {
      diagnosticInfoContainer.show();
    } else {
      diagnosticInfoContainer.hide();
    }
  });
});