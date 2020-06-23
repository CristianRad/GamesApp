using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GamesApp.API.Migrations
{
    public partial class AddedGameClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Budget",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastActive",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    Multiplayer = table.Column<bool>(nullable: false),
                    PhotoUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PurchasedGames",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    GameId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchasedGames", x => new { x.UserId, x.GameId });
                    table.ForeignKey(
                        name: "FK_PurchasedGames_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchasedGames_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurchasedGames_GameId",
                table: "PurchasedGames",
                column: "GameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchasedGames");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropColumn(
                name: "Budget",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastActive",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Users");
        }
    }
}
