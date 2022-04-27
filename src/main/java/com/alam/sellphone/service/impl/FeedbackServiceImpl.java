package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.Feedback;
import com.alam.sellphone.repository.FeedbackRepository;
import com.alam.sellphone.service.FeedbackService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Feedback}.
 */
@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    private final Logger log = LoggerFactory.getLogger(FeedbackServiceImpl.class);

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public Feedback save(Feedback feedback) {
        log.debug("Request to save Feedback : {}", feedback);
        return feedbackRepository.save(feedback);
    }

    @Override
    public Optional<Feedback> partialUpdate(Feedback feedback) {
        log.debug("Request to partially update Feedback : {}", feedback);

        return feedbackRepository
            .findById(feedback.getId())
            .map(
                existingFeedback -> {
                    if (feedback.getUserID() != null) {
                        existingFeedback.setUserID(feedback.getUserID());
                    }
                    if (feedback.getProductID() != null) {
                        existingFeedback.setProductID(feedback.getProductID());
                    }
                    if (feedback.getContent() != null) {
                        existingFeedback.setContent(feedback.getContent());
                    }
                    if (feedback.getRate() != null) {
                        existingFeedback.setRate(feedback.getRate());
                    }
                    if (feedback.getCreatedDate() != null) {
                        existingFeedback.setCreatedDate(feedback.getCreatedDate());
                    }

                    return existingFeedback;
                }
            )
            .map(feedbackRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Feedback> findAll(Pageable pageable) {
        log.debug("Request to get all Feedbacks");
        return feedbackRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Feedback> findOne(Long id) {
        log.debug("Request to get Feedback : {}", id);
        return feedbackRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Feedback : {}", id);
        feedbackRepository.deleteById(id);
    }
}
