const regexes = {
    schaft: ".*s.*c.*h.*a.*f.*t.*",
    dick: ".*d.*i.*c.*k.*",
    cock: ".*c.*o.*c.*k.*",
    sex: ".*s.*e.*x.*",
    hart: ".*h.*a.*r.*t.*",
    jens: ".*j.*e.*n.*s.*",
    schwanz: ".*s.*c.*h.*w.*a.*n.*z.*",
    schrot: ".*s.*c.*h.*r.*o.*t.*",
    penis: ".*p.*e.*n.*i.*s.*",
}

export default regexes;

export function formatSchaftString(schaftString: string, matches: (keyof typeof regexes)[]) {
    // Extract letters from the pattern by filtering out '.' and '*'
    let totalString = '';
    matches.forEach((pattern) => {
        let letterIndex = 0;
        totalString += `**${pattern}**: `;

        for (let i = 0; i < schaftString.length; i++) {
            if (letterIndex < pattern.length && schaftString[i] === pattern[letterIndex]) {
                totalString += schaftString[i];
                letterIndex++;
            } else {
                if (schaftString[i] === ' ') continue;
                totalString += '-';
            }
        }
        totalString += '\n';
    })

    return totalString;
}
