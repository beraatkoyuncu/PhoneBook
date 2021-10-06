using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Aspects.Caching;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class PhoneManager : IPhoneService
    {
        private IPhoneDal _phoneDal;

        public PhoneManager(IPhoneDal phoneDal)
        {
            _phoneDal = phoneDal;
        }

        public IResult Add(Phone phone)
        {
            IResult result = BusinessRules.Run(CheckIfPhoneNumberExists(phone.PhoneNumber), CheckIfNamexists(phone.Name));
            if (result != null)
            {
                return result;
            }
            _phoneDal.Add(phone);
            return new SuccessResult(Messages.PhoneNumberAdded);
        }



        public IResult Update(Phone phone)
        {
            _phoneDal.Update(phone);
            return new SuccessResult(Messages.PhoneNumberUpdated);
        }

        public IResult Delete(Phone phone)
        {
           
            _phoneDal.Delete(phone);
            return new SuccessResult(Messages.PhoneNumberDeleted);
            
        }



        public IDataResult<List<Phone>> GetAll()
        {
            return new SuccessDataResult<List<Phone>>(_phoneDal.GetAll(), Messages.PhoneNumberListed);
        }

        public IDataResult<Phone> GetById(int id)
        {
            return new SuccessDataResult<Phone>(_phoneDal.Get(p => p.Id == id));
        }
        
        private IResult CheckIfPhoneNumberExists(string phoneNumber)
        {
            var result = _phoneDal.GetAll(p => p.PhoneNumber == phoneNumber).Any();
            if (result)
            {
                return new ErrorResult(Messages.PhoneNumberExists);
            }
            return new SuccessResult();
        }

        private IResult CheckIfNamexists(string name)
        {
            var result = _phoneDal.GetAll(p => p.Name == name).Any();
            if (result)
            {
                return new ErrorResult(Messages.NameExists);
            }
            return new SuccessResult();
        }

        
    }
}
