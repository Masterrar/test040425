using AutoMapper;

using App.DTO;
using App.DAL.Models;

namespace App.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<DataRecord, DataRecordDto>();
    }
}