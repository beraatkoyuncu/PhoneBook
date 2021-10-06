using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Business.Constants
{
    public static class Messages
    {
        public static string PhoneNumberUpdated = "Kişi Güncellendi.";
        public static string PhoneNumberAlreadyExists { get; internal set; }

        public static string PhoneNumberListed = "Kişiler Listelendi";

        public static string PhoneNumberDeleted = "Kişi Silindi.";
        public static string AuthorizationDenied { get; internal set; }
        public static string UserRegistered { get; internal set; }
        public static User UserNotFound { get; internal set; }
        public static User PasswordError { get; internal set; }
        public static string SuccessfulLogin { get; internal set; }
        public static string UserAlreadyExists { get; internal set; }
        public static string AccessTokenCreated { get; internal set; }
        public static string PhoneNumberAdded = "Kişi Kaydedildi.";

        public static string NameExists = "Aynı İsim Kayıtlı.";

        public static string PhoneNumberExists = "Aynı Numara Kayıtlı.";
    }
}
