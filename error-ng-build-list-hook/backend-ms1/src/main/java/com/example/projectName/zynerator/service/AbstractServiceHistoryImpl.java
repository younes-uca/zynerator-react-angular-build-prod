package com.example.projectName.zynerator.service;

import com.example.projectName.zynerator.dto.AuditEntityDto;
import com.example.projectName.zynerator.exception.EntityNotFoundException;
import com.example.projectName.zynerator.history.HistBusinessObject;
import com.example.projectName.zynerator.history.HistCriteria;
import com.example.projectName.zynerator.repository.AbstractHistoryRepository;
import com.example.projectName.zynerator.security.bean.User;
import com.example.projectName.zynerator.security.service.facade.UserService;
import com.example.projectName.zynerator.specification.AbstractHistorySpecification;
import com.example.projectName.zynerator.util.RefelexivityUtil;
import com.example.projectName.zynerator.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;


public abstract class AbstractServiceHistoryImpl< H extends HistBusinessObject, HC extends HistCriteria,  HISTREPO extends AbstractHistoryRepository<H, Long>>  {



    protected HISTREPO historyRepository;
    protected Class<H> historyClass;
    protected Class<HC> historyCriteriaClass;
    protected Class<? extends AbstractHistorySpecification<HC, H>> historySPecificationClass;


    @Autowired
    protected UserService userService;



    public AbstractServiceHistoryImpl( HISTREPO historyRepository) {
        this.historyRepository = historyRepository;
        this.configure();
    }


    public void deleteAssociatedLists(Long id) {
    }

    public void deleteById(Long id) {
        historyRepository.deleteById(id);
    }

    public void deleteByIdIn(List<Long> ids) {
        //dao.deleteByIdIn(ids);
    }


    /*
    public void saveAuditData(DTO dto, ACTION_TYPE action){
    DTO old = abstractConverter.toDto(findById(dto.getId()));
    try {
        if (Utils.compareObjectsDiff(dto, old)) {
            constructAndSaveHistory(dto, action);
        }
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    public void constructAndSaveHistory(DTO dto, ACTION_TYPE action) {
        User currentUser = getCurrentUser();
        H history = RefelexivityUtil.constructObjectUsingDefaultConstr(historyClass);
        history.setActionType(action.name());
        history.setObjectName(itemClass.getSimpleName());
        history.setObjectId(dto.getId());
        history.setUserId(currentUser.getId());
        history.setUsername(currentUser.getUsername());
        String dtoAsJson = null;
        try {
            dtoAsJson = new ObjectMapper().writeValueAsString(dto);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        history.setData(dtoAsJson);
        history.setDateHistory(LocalDateTime.now());
        historyRepository.save(history);
    }

    */

    public AuditEntityDto findHistoryById(Long id) {
        H h = historyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("errors.notFound", new String[]{historyClass.getSimpleName(), id.toString()}));
        return null;
        //TODO: restore this ==> return (AuditEntityDto) abstractConverter.copyFromHistory(h);
    }


    public List<AuditEntityDto> findHistoryPaginatedByCriteria(HC historyCriteria, int page, int pageSize, String order, String sortField) {
        AbstractHistorySpecification<HC, H> mySpecification = constructSpecificationHistory(historyCriteria);
        order = StringUtil.isNotEmpty(order) ? order : "desc";
        sortField = StringUtil.isNotEmpty(sortField) ? sortField : "id";
        Pageable pageable = PageRequest.of(page, pageSize, Sort.Direction.fromString(order), sortField);
        List<H> content = historyRepository.findAll(mySpecification, pageable).getContent();
        return null;
        //TODO: restore this ==> return content.stream().map(h -> (AuditEntityDto) abstractConverter.copyFromHistory(h)).collect(Collectors.toList());
    }

    public List<AuditEntityDto> findHistoryByCriteria(HC historyCriteria) {
        AbstractHistorySpecification<HC, H> mySpecification = constructSpecificationHistory(historyCriteria);
        List<H> content = null;
        if (historyCriteria.isPeagable()) {
            Pageable pageable = PageRequest.of(0, historyCriteria.getMaxResults());
            content = historyRepository.findAll(mySpecification, pageable).getContent();
        } else {
            content = historyRepository.findAll(mySpecification);
        }
        return null;
        //TODO: restore this ==> return content.stream().map(h -> (AuditEntityDto) abstractConverter.copyFromHistory(h)).collect(Collectors.toList());
    }

    public int getHistoryDataSize(HC historyCriteria) {
        AbstractHistorySpecification<HC, H> mySpecification = constructSpecificationHistory(historyCriteria);
        mySpecification.setDistinct(true);
        return ((Long) historyRepository.count(mySpecification)).intValue();
    }

    private AbstractHistorySpecification<HC, H> constructSpecificationHistory(HC hc) {
        AbstractHistorySpecification<HC, H> mySpecification = RefelexivityUtil.constructObjectUsingDefaultConstr(historySPecificationClass);
        mySpecification.setCriteria(hc);
        return mySpecification;
    }

    public void configure(Class<H> historyClass, Class<HC> historyCriteriaClass) {
        this.historyClass = historyClass;
        this.historyCriteriaClass = historyCriteriaClass;
    }

    public abstract void configure();



    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal != null && principal instanceof User) {
        return (User) principal;
        } else if (principal != null && principal instanceof String) {
        return userService.findByUsername(principal.toString());
        } else {
        return null;
        }
    }

    public Long getEtablissementId() {
        User currentUser = getCurrentUser();
        Long etablissementId = (currentUser != null && currentUser.getEtablissement() != null) ? currentUser.getEtablissement().getId() : null;
        return etablissementId == null ? 1L : etablissementId; // TODO: if conneceted user is null exception
    }


}
