using Core.Utilities.IoC;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Extensions
{
    //extentions yazabilmek için class'ın static olması gerekiyor
    public static class ServiceCollectionExtensions

        //core katmanı da dahil olmak üzere ekleyeceğimiz tüm injections'ı bir arada toplayabileceğimiz bir yapı
        //istediğimiz kadar module ekleyebiliriz
    {
        public static IServiceCollection AddDependencyResolvers(this IServiceCollection serviceCollection, ICoreModule[] modules)//serviceCollections'ı genişletmek istediğimiz için this kullanıyoruz
        {
            foreach (var module in modules)
            {
                module.Load(serviceCollection);
            }

            return ServiceTool.Create(serviceCollection);

        }
    }
}
