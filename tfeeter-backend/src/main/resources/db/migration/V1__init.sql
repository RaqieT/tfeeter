CREATE TABLE tfeet
(
    id uuid NOT NULL,
    account_id uuid NOT NULL,
    author character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_date TIMESTAMP NOT NULL
);

--
-- @Table("tfeet")
-- public class Tfeet {
--     @Id
--     @GeneratedValue
--     private UUID id;
--
--     @NonNull
-- @Column(nullable = false, name = "account_id")
--     private UUID accountId;
--
--     @NonNull
-- @Column(nullable = false)
--     private String author;
--
--     @NonNull
-- @Column(nullable = false)
--     private String title;
--
--     @NonNull
-- @Column(nullable = false)
--     private String description;
--
--     @CreationTimestamp
-- @Column(nullable = false,  name = "created_date")
--     private LocalDateTime createdDate;
--
-- }
