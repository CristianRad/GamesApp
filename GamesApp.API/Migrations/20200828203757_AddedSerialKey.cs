using Microsoft.EntityFrameworkCore.Migrations;

namespace GamesApp.API.Migrations
{
    public partial class AddedSerialKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SerialKey",
                table: "PurchasedGames",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SerialKey",
                table: "PurchasedGames");
        }
    }
}
