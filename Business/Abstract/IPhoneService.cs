using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IPhoneService
    {
        //mesaj ve işlem sonucu da dönsün diye IDataResult kullanıldı
        IDataResult<List<Phone>> GetAll();
        IDataResult<Phone> GetById(int id);
        IResult Add(Phone phone);

        IResult Delete(Phone phone);

        IResult Update(Phone phone);

    }
}
