using Microsoft.EntityFrameworkCore.Migrations;

namespace ReadLater.Database.Migrations
{
    public partial class UserSession : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserSessions",
                newName: "UserName");

            migrationBuilder.AddColumn<bool>(
                name: "IsAuthorized",
                table: "UserSessions",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "RequestToken",
                table: "UserSessions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAuthorized",
                table: "UserSessions");

            migrationBuilder.DropColumn(
                name: "RequestToken",
                table: "UserSessions");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "UserSessions",
                newName: "UserId");
        }
    }
}
