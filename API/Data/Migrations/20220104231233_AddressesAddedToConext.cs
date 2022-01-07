using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class AddressesAddedToConext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAddress_Profiles_UserProfileId",
                table: "UserAddress");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAddress",
                table: "UserAddress");

            migrationBuilder.RenameTable(
                name: "UserAddress",
                newName: "Addresses");

            migrationBuilder.RenameIndex(
                name: "IX_UserAddress_UserProfileId",
                table: "Addresses",
                newName: "IX_Addresses_UserProfileId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Profiles_UserProfileId",
                table: "Addresses",
                column: "UserProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Profiles_UserProfileId",
                table: "Addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.RenameTable(
                name: "Addresses",
                newName: "UserAddress");

            migrationBuilder.RenameIndex(
                name: "IX_Addresses_UserProfileId",
                table: "UserAddress",
                newName: "IX_UserAddress_UserProfileId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAddress",
                table: "UserAddress",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAddress_Profiles_UserProfileId",
                table: "UserAddress",
                column: "UserProfileId",
                principalTable: "Profiles",
                principalColumn: "Id");
        }
    }
}
