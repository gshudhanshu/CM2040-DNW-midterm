
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;


--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS blog_settings (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blog_title TEXT NOT NULL,
    blog_subtitle TEXT NOT NULL,
    blog_author TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_title TEXT NOT NULL,
    article_subtitle TEXT NOT NULL,
    article_content TEXT NOT NULL,
    article_author TEXT NOT NULL,
    article_likes INTEGER NULL DEFAULT 0,
    article_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    article_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    article_published_on TIMESTAMP NULL DEFAULT NULL,
    article_status TEXT NOT NULL DEFAULT 'Draft'
);

CREATE TABLE IF NOT EXISTS article_comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment_name TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    comment_likes INTEGER NULL DEFAULT 0,
    comment_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    comment_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    article_id INTEGER,
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
);



--insert default data (if necessary here)

INSERT INTO blog_settings ("blog_title", "blog_subtitle", "blog_author") VALUES ("Panda Coders", "It is free for anyone to read and write", "Shudhanshu Gunjal");
INSERT INTO articles ("article_title", "article_subtitle", "article_content", "article_author") VALUES( "This is first article of Panda Coders", "This is first subtitle of the Panda Coders", "This is first content of the Panda Coders", "Shudhanshu"); --try changing the test_user_id to a different number and you will get an error

COMMIT;

