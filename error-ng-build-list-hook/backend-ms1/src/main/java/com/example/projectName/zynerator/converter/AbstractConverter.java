package com.example.projectName.zynerator.converter;


import com.example.projectName.zynerator.bean.Etablissement;
import com.example.projectName.zynerator.dto.EtablissementDto;

import com.example.projectName.zynerator.util.ListUtil;
import com.example.projectName.zynerator.audit.AuditBusinessObject;
import com.example.projectName.zynerator.bean.BusinessObject;
import com.example.projectName.zynerator.dto.AuditBaseDto;
import com.example.projectName.zynerator.dto.BaseDto;
import com.example.projectName.zynerator.util.DateUtil;
import com.example.projectName.zynerator.util.RefelexivityUtil;
import com.example.projectName.zynerator.util.StringUtil;
import com.example.projectName.zynerator.util.Utils;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractConverter<T extends BusinessObject, DTO extends BaseDto> {
    protected int maxLevel = 2;
    protected Class<T> itemType;
    protected Class<DTO> dtoType;

    protected AbstractConverter(Class<T> itemType, Class<DTO> dtoType) {
        this.itemType = itemType;
        this.dtoType = dtoType;
        this.init(true);
    }

    public abstract T toItem(DTO dto);

    public abstract DTO toDto(T item);

    public void copy(DTO dto, T t) {
        T myItem = toItem(dto);
        Utils.copyNonNullProperties(myItem,t);
    }
/*
    public void convertEtablissement(T item, DTO dto) {
        if (dto.getEtablissementDto() != null && dto.getEtablissementDto().getId() != null) {
            item.setEtablissement(new Etablissement());
            item.getEtablissement().setId(dto.getEtablissementDto().getId());
        }
    }

    public void convertEtablissement(DTO dto, T item) {
        if (item.getEtablissement() != null && item.getEtablissement().getId() != null) {
            dto.setEtablissementDto(new EtablissementDto());
            dto.getEtablissementDto().setId(item.getEtablissement().getId());
        }
    }
*/
    public List<T> toItem(List<DTO> dtos) {
        List<T> items = new ArrayList<>();
        if (dtos != null && !dtos.isEmpty()) {
            for (DTO DTO : dtos) {
                items.add(toItem(DTO));
            }
        }
        return items;
    }

    public T getById(DTO dto) {
        T result = null;
        if (dto != null) {
            try {
                result = itemType.getDeclaredConstructor(Long.class).newInstance(dto.getId());
            } catch (NoSuchMethodException | InstantiationException | IllegalAccessException |
                     InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }

    public DTO getById(T t) {
        DTO result = null;
        if (t != null) {
            try {
                result = dtoType.getDeclaredConstructor(Long.class).newInstance(t.getId());
            } catch (NoSuchMethodException | InstantiationException | IllegalAccessException |
                     InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }


    public List<DTO> toDto(List<T> items) {
        List<DTO> dtos = new ArrayList();
        if (items != null && !items.isEmpty()) {
            for (T item : items) {
                dtos.add(toDto(item));
            }
        }
        return dtos;
    }

    public void copyToDto(T t, DTO dto) {
        copy(t, dto);
    }

    public DTO copyToDto(T t) {
        DTO dto = RefelexivityUtil.constructObjectUsingDefaultConstr(dtoType);
        copy(t, dto);
        return dto;
    }


    private void copy(T t, DTO dto) {
        if (t != null && dto != null && t instanceof AuditBusinessObject && dto instanceof AuditBaseDto) {
            AuditBusinessObject audited = (AuditBusinessObject) t;
            AuditBaseDto auditedDto = (AuditBaseDto) dto;
            auditedDto.setCreatedBy(audited.getCreatedBy());
            auditedDto.setCreatedOn(DateUtil.dateTimeToString(audited.getCreatedOn()));
            auditedDto.setUpdatedBy(audited.getUpdatedBy());
            auditedDto.setUpdatedOn(DateUtil.dateTimeToString(audited.getUpdatedOn()));
        }

    }



    public DTO copyIncludeExclude(DTO dtoSource, String[] includes, String[] excludes) {
        DTO dtoTarget = RefelexivityUtil.constructObjectUsingDefaultConstr(dtoType);
        return copy(dtoSource, dtoTarget, includes, excludes);
    }

    public List<DTO> copyIncludeExcludeDtos(List<DTO> dtoSources, String[] includes, String[] excludes) {
        return ListUtil.emptyIfNull(dtoSources).stream().map(dto -> copyIncludeExclude(dto, includes, excludes))
               .collect(Collectors.toList());
    }
    public T copyIncludeExclude(T tSource, String[] includes, String[] excludes) {
        T tTarget = RefelexivityUtil.constructObjectUsingDefaultConstr(itemType);
        return copy(tSource, tTarget, includes, excludes);
    }

    public List<T> copyIncludeExcludeItems(List<T> tSources, String[] includes, String[] excludes) {
        return ListUtil.emptyIfNull(tSources).stream().map(t -> copyIncludeExclude(t, includes, excludes))
        .collect(Collectors.toList());
    }

    private DTO copy(DTO dtoSource, DTO dtoTarget, String[] includes, String[] excludes) {
        if (StringUtil.isNoEmpty(includes) || StringUtil.isNoEmpty(excludes)) {
            if (StringUtil.isNoEmpty(includes))
                RefelexivityUtil.copyIncludesProperties(dtoSource, dtoTarget, includes);
            if (StringUtil.isNoEmpty(excludes))
                RefelexivityUtil.copyExcludesProperties(dtoSource, dtoTarget, excludes);

            dtoTarget.setId(dtoSource.getId());
            return dtoTarget;
        }
        return dtoSource;
    }


    private T copy(T itemSource, T itemTarget, String[] includes, String[] excludes) {
        if (StringUtil.isNoEmpty(includes) || StringUtil.isNoEmpty(excludes)) {
            if (StringUtil.isNoEmpty(includes))
                RefelexivityUtil.copyIncludesProperties(itemSource, itemTarget, includes);
            if (StringUtil.isNoEmpty(excludes))
                RefelexivityUtil.copyExcludesProperties(itemSource, itemTarget, excludes);

        itemTarget.setId(itemSource.getId());
        return itemTarget;
        }

        return itemSource;
    }


    public void init(boolean initialisation){
        initObject(initialisation);
        initList(initialisation);
    }

    public void initObject(boolean initialisationObject){

    }

    public void initList(boolean initialisationList){

    }

    public int getMaxLevel() {
        return maxLevel;
    }

    public void setMaxLevel(int maxLevel) {
        this.maxLevel = maxLevel;
    }
}
