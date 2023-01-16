
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;
--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

-- Create tables for the blog setting
CREATE TABLE IF NOT EXISTS blog_settings (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blog_title TEXT NOT NULL,
    blog_subtitle TEXT NOT NULL,
    blog_author TEXT NOT NULL
);

-- Create tables for the articles
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

-- Create tables for the comments
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



-- Seed data generated using https://generatedata.com/

INSERT INTO blog_settings ("blog_title", "blog_subtitle", "blog_author") VALUES ("Panda Coders", "It is free for anyone to read and write", "Shudhanshu Gunjal");
INSERT INTO articles ("article_title", "article_subtitle", "article_content", "article_author", "article_likes")
VALUES
  ("Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat",
  "massa. Integer vitae nibh. Donec est mauris,",
  "tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus.",
  "Shana Richards",
  14),
  ("sagittis placerat.","sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem","tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam","Teegan Gallagher",15),
  ("Quisque ornare tortor at risus. Nunc ac","magna","Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut,","Marsden Franco",23),
  ("libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet","eros. Proin ultrices.","augue porttitor interdum. Sed auctor odio a purus. Duis elementum, dui quis accumsan convallis, ante lectus convallis est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at,","Merrill Stone",20),
  ("rutrum urna, nec luctus felis purus ac","nunc sit amet metus. Aliquam erat volutpat.","sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat tellus","Arthur Santos",27);

  INSERT INTO articles (
    "article_title",
   "article_subtitle",
    "article_content",
     "article_author",
      "article_likes",
       "article_published_on",
        "article_status")
VALUES
  ("sociis natoque penatibus et magnis dis parturient",
  "parturient montes feugiat. Sed",
  "nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean massa.",
  "Graiden Chapman",  14,    "2023-01-15 23:52:34",    "Published"),

  ("in aliquet lobortis, nisi nibh",  "nunc interdum feugiat. Sed nec",
  "Proin vel arcu eu odio tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus",
  "Channing Noel",  26,   "2023-01-15 23:52:34",     "Published"),
  ("augue ut",   "nec tellus. Nunc lectus pede,",
  "dis parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam","Sybil Spencer",7, "2023-01-15 23:52:34", "Published"),
  ("dis parturient montes, nascetur ridiculus","justo","primis in faucibus orci luctus et ultrices posuere cubilia Curae Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.","Hasad Harrington",11, "2023-01-15 23:52:34", "Published"),
  ("Fusce dolor quam, elementum at, egestas a, scelerisque sed,","sociis natoque penatibus et","ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem","Lacota Mccarty",13, "2023-01-15 23:52:34", "Published");

INSERT INTO article_comments ("comment_name","comment_text","comment_likes","article_id")
VALUES
  ("Keane Vang","elit, a feugiat tellus lorem eu metus. In lorem.",7,6),
  ("Selma Harmon","hendrerit neque. In ornare sagittis felis. Donec",5,3),
  ("Hoyt Vinson","convallis",8,2),
  ("Jenette Farmer","vel nisl. Quisque fringilla euismod enim.",1,4),
  ("Thane Huff","Duis elementum, dui quis accumsan convallis,",9,7),
  ("David Glover","urna. Vivamus molestie dapibus ligula. Aliquam",9,3),
  ("Cheyenne Gardner","enim, gravida sit amet, dapibus",9,9),
  ("Zia Beasley","Curabitur dictum. Phasellus in felis. Nulla tempor augue",5,1),
  ("Hadassah Burnett","ornare, elit elit",1,1),
  ("Lana Savage","magna nec quam. Curabitur",8,6),
  ("Abdul Oliver","in consectetuer ipsum nunc id enim. Curabitur",2,4),
  ("Jason Munoz","parturient montes, nascetur ridiculus mus. Proin vel",6,9),
  ("Alisa Dixon","semper cursus. Integer mollis.",3,4),
  ("McKenzie Banks","facilisis non, bibendum sed, est.",1,2),
  ("August Carroll","semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim",3,1),
  ("Wendy Collins","tristique aliquet. Phasellus fermentum convallis ligula. Donec",7,4),
  ("Giselle Phelps","Nunc",7,2),
  ("Mark Cunningham","venenatis a, magna. Lorem",2,4),
  ("Alfonso Wong","velit",8,10),
  ("Ross Santos","ipsum primis in faucibus orci luctus et ultrices",1,1);

COMMIT;
