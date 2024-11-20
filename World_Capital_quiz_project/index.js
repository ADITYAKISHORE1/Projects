import pg from "pg";
import express from "express";
import bodyParser from "body-parser";
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "admin",
    port: 5432
});
const app = express();
const port = 3000;
app.use(express.static('public'))
let quiz = [];
db.connect();
db.query("SELECT * FROM capitals", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    }
    else {
        quiz = res.rows;
    }

});
let bestScore;
db.query("SELECT * FROM result", (err, res) => {

    if (err) {
        console.error("Error executing query", err.stack);
    }
    else {
        bestScore = res.rows[0].result;
    }
    
});

app.use(bodyParser.urlencoded({ extended: true }));
let currentQues = [];
let bScore=0;
let tscore = 0;
app.get("/", async (req, res) => {
    tscore = 0;
    await nextQues();
    console.log(currentQues);
    bScore = Math.max(bScore, bestScore);
    console.log(bScore);
    res.render("index.ejs", {
        country: currentQues.country,
        wasCorrect: null,
        score: null,
        bscore: bScore
    });
});
app.get("/submit", (req, res) => {
    res.redirect('/');
});
app.post("/submit", async (req, res) => {
    let ans = req.body.ans.trim();
    //console.log(ans);
    let isCorrect = false;
    if (currentQues) {
        if (ans.toLowerCase() === currentQues.capital.toLowerCase()) {
            tscore++;
            bScore = Math.max(bScore, tscore);
            bScore = Math.max(bScore, bestScore);
            await db_input(bScore);
            isCorrect = true;
        }
    }
    await nextQues();
    console.log(currentQues);
    console.log(bScore);
    res.render("index.ejs", {
        score: tscore,
        country: currentQues.country,
        wasCorrect: isCorrect,
        bscore: bScore
    })
});


async function nextQues() {
    const randCountry = quiz[Math.floor(Math.random() * quiz.length)];
    currentQues = randCountry;
}
function db_input(res){
    if(res>bestScore){
        console.log(res);
        db.query(`UPDATE result SET result=${res} WHERE id=1`, (err, res) => {
            if (err) {
                console.error("Error executing query", err.stack);
            }
            else {
                console.log("Maximum score updated in DB");
            }
            
        });
}
}
app.listen(port, () => {
    console.log(`Server live on port ${port}`);
})
