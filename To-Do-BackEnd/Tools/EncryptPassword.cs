using System.Security.Cryptography;
using System.Text;

namespace To_Do_BackEnd.Tools
{
    public static class EncryptPassword
    {
        public static string EncryptedPassword(this string Password)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new();
            byte[] stream = null;
            StringBuilder sb = new();
            stream = sha256.ComputeHash(encoding.GetBytes(Password));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
    }
}
