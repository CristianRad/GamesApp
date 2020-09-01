using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GamesApp.API.Migrations
{
    public partial class AddedDownloadFile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "DownloadFile",
                table: "Games",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DownloadFile",
                table: "Games");
        }
    }
}
