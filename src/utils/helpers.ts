export const regexes = {
    schaft: "s.{0,12}c.{0,12}h.{0,12}a.{0,12}f.{0,12}t",
    dick: "d.{0,12}i.{0,12}c.{0,12}k",
    cock: "c.{0,12}o.{0,12}c.{0,12}k",
    sex: "s.{0,12}e.{0,12}x",
    hart: "h.{0,12}a.{0,12}r.{0,12}t",
    jens: "j.{0,12}e.{0,12}n.{0,12}s",
    schwanz: "s.{0,12}c.{0,12}h.{0,12}w.{0,12}a.{0,12}n.{0,12}z",
    schrot: "s.{0,12}c.{0,12}h.{0,12}r.{0,12}o.{0,12}t",
    penis: "p.{0,12}e.{0,12}n.{0,12}i.{0,12}s",
    ficken: "f.{0,12}i.{0,12}c.{0,12}k.{0,12}e.{0,12}n",
    blowjob: "b.{0,12}l.{0,12}o.{0,12}w.{0,12}j.{0,12}o.{0,12}b",
    anal: "a.{0,12}n.{0,12}a.{0,12}l",
    pussy: "p.{0,12}u.{0,12}s.{0,12}s.{0,12}y",
    dildo: "d.{0,12}i.{0,12}l.{0,12}d.{0,12}o",
    arsch: "a.{0,12}r.{0,12}s.{0,12}c.{0,12}h",
};

export const creepyLinks = [
    "https://spartanscoop.org/wp-content/uploads/2023/10/The-Mandela-Catalogue-Vol.-1-8-37-screenshot-1200x675.jpg",
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*8nwbcRB45hY-qneRoqgbZg.jpeg",
    "https://d3q27bh1u24u2o.cloudfront.net/news/LBB_-_New_40_2bKD7fT.png",
    "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/61f542ae01a9f0001eef18b0.png",
    "https://i1.sndcdn.com/artworks-szJi4iBVgxF7fbaI-DpCWHg-t500x500.jpg",
]

export function formatSchaftString(schaftString: string, matches: (keyof typeof regexes)[]) {
    // Extract letters from the pattern by filtering out '.' and '*'
    let totalString = '';
    matches.forEach((pattern) => {
        let letterIndex = 0;
        totalString += `**${pattern}**: `;

        for (let i = 0; i < schaftString.length; i++) {
            if (letterIndex >= pattern.length) {
                break;
            }

            if (letterIndex < pattern.length && schaftString.toLowerCase()[i] === pattern[letterIndex]) {
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
